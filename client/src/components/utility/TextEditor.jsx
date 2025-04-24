import { useMemo } from 'react';
import {LexicalComposer} from '@lexical/react/LexicalComposer';
import {RichTextPlugin} from '@lexical/react/LexicalRichTextPlugin';
import {ContentEditable} from '@lexical/react/LexicalContentEditable';
import {HistoryPlugin} from '@lexical/react/LexicalHistoryPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin'
import {LexicalErrorBoundary} from '@lexical/react/LexicalErrorBoundary';
import { ListNode , ListItemNode } from '@lexical/list'
import ToolbarPlugin from './editorPlugins/ToolbarPlugin';
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin"
import { $generateHtmlFromNodes, $generateNodesFromDOM  } from '@lexical/html'
import LoadDataPlugin from './editorPlugins/LoadDataPlugin';
import { LinkNode } from '@lexical/link';
import { ClickableLinkPlugin } from '@lexical/react/LexicalClickableLinkPlugin'
import { LinkPlugin as LexicalLinkPlugin } from '@lexical/react/LexicalLinkPlugin'

const theme = {
    paragraph: 'font-gilroy',
    text : {
        underline : 'underline',
        bold : 'font-gilroy text-white',
    },
    list : {
        ol : 'ml-5 list-decimal font-gilroy',
        ul : "ml-5 list-disc font-gilroy"
    },
    link: 'text-blue-500 underline cursor-pointer hover:text-blue-700',
}


// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.
function onError(error) {
    // console.error("Lexical Editor Error:", error);
}

function TextEditor({htmlData,loaded,errors,placeholder,setEditorContent}) {

    const initialConfig = {
        namespace: 'MyEditor',
        theme,
        nodes : [
            ListNode,
            ListItemNode,
            LinkNode
        ],
        onError,
      };
      


    const handleOnChange = (editorState, editor)=>{
        editor.update(()=>{
            const htmlString = $generateHtmlFromNodes(editor)
            setEditorContent(htmlString);
        })        
    }  

    const CustomContent = useMemo(() => {
        return (
            <ContentEditable className={`editor-editable scrollbar-hide ${errors ? "border border-red-500" : ""}`} />
        )
    }, [errors]);

    const CustomPlaceholder = useMemo(() => {
        return (
            <div className='absolute top-[4rem] left-4 text-font-gray font-gilroy '>
                {placeholder || "Enter some text..."} 
            </div>
        )
    }, []);
    
      return (
        <div className='w-full relative bg-background-40 rounded-xl  '>
            <LexicalComposer initialConfig={initialConfig}>
                <ToolbarPlugin errors={errors} />
                <ListPlugin />
                <LexicalLinkPlugin />
                <ClickableLinkPlugin />
                <LoadDataPlugin htmlData={htmlData} loaded />
                <RichTextPlugin contentEditable={CustomContent} placeholder={CustomPlaceholder}
                    ErrorBoundary={LexicalErrorBoundary} />
                <HistoryPlugin />
                <OnChangePlugin onChange={handleOnChange} />
            </LexicalComposer>
        </div>
      );
}

export default TextEditor
