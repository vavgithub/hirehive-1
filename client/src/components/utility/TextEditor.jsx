import {$getRoot, $getSelection} from 'lexical';
import {useEffect, useMemo} from 'react';
import {LexicalComposer} from '@lexical/react/LexicalComposer';
import {RichTextPlugin} from '@lexical/react/LexicalRichTextPlugin';
import {ContentEditable} from '@lexical/react/LexicalContentEditable';
import {HistoryPlugin} from '@lexical/react/LexicalHistoryPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin'
import {LexicalErrorBoundary} from '@lexical/react/LexicalErrorBoundary';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { ListNode , ListItemNode } from '@lexical/list'
import ToolbarPlugin from './editorPlugins/ToolbarPlugin';

const theme = {
    paragraph: 'editor-paragraph',
    text : {
        underline : 'underline'
    },
    list : {
        ol : 'ml-5 list-decimal',
        ul : "ml-5 list-disc"
    }
}

function OnChangePlugin({onChange}){
    const [ editor ] = useLexicalComposerContext();

    useEffect(()=>{
        return editor.registerUpdateListener(({editorState})=>{
            onChange(editorState)
        })
    },[onChange,editor])
}

// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.
function onError(error) {
  console.error(error);
}

function TextEditor({placeholder}) {
    const initialConfig = {
        namespace: 'MyEditor',
        theme,
        nodes : [
            ListNode,
            ListItemNode
        ],
        onError,
      };

    const CustomContent = useMemo(() => {
        return (
            <ContentEditable style={{
                position: 'relative',
                background: 'var(--color-background-40)',
                borderRadius: '0px 0px 12px 12px',
                maxWidth: '100%',
                minHeight : "12rem",
                outline : "none",
                padding : "8px 16px"
            }}/>
        )
    }, []);

    const CustomPlaceholder = useMemo(() => {
        return (
            <div style={{
                position: 'absolute', top: "4rem", left: "16px"
            }}>
                Enter some text...
            </div>
        )
    }, []);
    
      return (
        <div className='w-full relative'>
            <LexicalComposer initialConfig={initialConfig}>
                <ListPlugin />
                <ToolbarPlugin/>
                <RichTextPlugin contentEditable={CustomContent} placeholder={CustomPlaceholder}
                    ErrorBoundary={LexicalErrorBoundary} />
                <HistoryPlugin />
                <OnChangePlugin onChange={(editorState)=>console.log(editorState)} />
            </LexicalComposer>
        </div>
      );
}

export default TextEditor
