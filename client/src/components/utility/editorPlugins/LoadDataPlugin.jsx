import React, { useEffect, useRef } from 'react'
import { $generateNodesFromDOM } from '@lexical/html';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { $createParagraphNode, $getRoot } from 'lexical';

function LoadDataPlugin({htmlData,loaded}) {
    const [editor] = useLexicalComposerContext();
    const firstRender = useRef(true);

    useEffect(()=>{
        if(htmlData && loaded && firstRender.current){
            firstRender.current = false;
            editor.update(() => {
                const parser = new DOMParser();
                const dom = parser.parseFromString(htmlData, "text/html");
                const nodes = $generateNodesFromDOM(editor, dom);
                // Get the root node of the editor
                const root = $getRoot();

                // Clear the root (optional if you want to replace existing content)
                root.clear();

                // Append the generated nodes to the root
                nodes.forEach((node) => root.append(node));
            });
        }
    },[htmlData , loaded , firstRender.current])

  return null
}

export default LoadDataPlugin
