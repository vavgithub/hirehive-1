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

const theme = {
    paragraph: 'font-outfit',
    text : {
        underline : 'underline',
        bold : 'font-bricolage text-white',
    },
    list : {
        ol : 'ml-5 list-decimal font-outfit',
        ul : "ml-5 list-disc font-outfit"
    }
}


// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.
function onError(error) {
//   console.error(error);
}

function TextEditor({htmlData,loaded,errors,placeholder,setEditorContent}) {

    const initialConfig = {
        namespace: 'MyEditor',
        theme,
        nodes : [
            ListNode,
            ListItemNode
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
            <div className='absolute top-[4rem] left-4 text-font-gray font-outfit '>
                {placeholder || "Enter some text..."} 
            </div>
        )
    }, []);
    
      return (
        <div className='w-full relative bg-background-40 rounded-xl  '>
            <LexicalComposer initialConfig={initialConfig}>
                <ListPlugin />
                <LoadDataPlugin htmlData={htmlData} loaded />
                <ToolbarPlugin errors={errors} />
                <RichTextPlugin contentEditable={CustomContent} placeholder={CustomPlaceholder}
                    ErrorBoundary={LexicalErrorBoundary} />
                <HistoryPlugin />
                <OnChangePlugin onChange={handleOnChange} />
            </LexicalComposer>
        </div>
      );
}

export default TextEditor
