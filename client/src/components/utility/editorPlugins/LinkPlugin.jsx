import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getSelection, $isRangeSelection, $createTextNode } from 'lexical';
import { $createLinkNode, $isLinkNode } from '@lexical/link';
import { Link } from 'lucide-react';
import React, { useState } from 'react';
import { InputField } from '../../Form/FormFields';
import { showErrorToast } from '../../ui/Toast'
import Modal from '../../Modals/Modal';

function LinkPlugin({isActive}) {
    const [editor] = useLexicalComposerContext();
    const [isOpen,setIsOpen] = useState(false);
    const [linkText,setLinkText] = useState('');
    const [url,setUrl] = useState('');

    const handlePopup = () => {
      editor.read(()=>{
        const selection = $getSelection();
        setLinkText(selection.getTextContent())
      })
      setIsOpen(true)
    }

    const handleMakeLink = () => {
          if (!url) {
            showErrorToast("Error" , 'Please add some URL')
            return};
  
          const validUrl = url.startsWith("http://") || url.startsWith("https://")
              ? url
              : `https://${url}`;
  
  
          editor.update(() => {
              const selection = $getSelection();

              if ($isRangeSelection(selection) && !selection.isCollapsed()) {
                  const linkNode = $createLinkNode(validUrl);
                  linkNode.append($createTextNode(linkText)); 
                  selection.insertNodes([linkNode]);
              }else{
                const linkNode = $createLinkNode(validUrl);
                const textNode = $createTextNode(linkText || "Enter text here");
                linkNode.append(textNode);

                selection.insertNodes([linkNode]);
                selection.insertText(""); // Move cursor inside the link node
              }
          });
    };

    const handleRemoveLink = () => {
      editor.update(() => {
          const selection = $getSelection();
  
          if ($isRangeSelection(selection)) {
              const nodes = selection.getNodes(); // Get selected nodes
  
              nodes.forEach(node => {
                  const parentNode = node.getParent();
  
                  if ($isLinkNode(parentNode)) {
                      const children = parentNode.getChildren(); // Get text nodes inside link
  
                      children.forEach(child => {
                          parentNode.insertBefore(child); // Insert each child before the link
                      });
  
                      parentNode.remove(); // Finally, remove the link node itself
                  }
              });
          }
      });
  };
  

    return (
        <>
        <button 
            type="button"
            className={"m-2 p-3 hover:bg-background-60 rounded-xl " + (isActive ? 'bg-accent-300' : '')}
            onClick={isActive ? handleRemoveLink :handlePopup}
        >
            <Link size={16} />
        </button>
        <Modal 
        open={isOpen}
        onConfirm={handleMakeLink}    
        onClose={()=>{setIsOpen(false) ; setLinkText(''); setUrl('')}}
        customTitle={"Add Link"}
        customMessage={'Add Hyperlink and the text to show into the description'}
        >
          <div className='flex flex-col gap-2 my-4'>
            <InputField
            id={"linkText"}
            type={'text'}
            label={'Text'}
            value={linkText}
            onChange={(e)=>setLinkText(e.target.value)}
            required={true}
            />
            <InputField
            id={"link"}
            type={'text'}
            label={'Link'}
            value={url}
            onChange={(e)=>setUrl(e.target.value)}
            required={true}
            />
          </div>
        </Modal>
        </>
    );
}

export default LinkPlugin;
