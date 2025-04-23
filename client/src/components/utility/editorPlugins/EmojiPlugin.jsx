import React, { useEffect, useRef, useState } from 'react'
import { combinedEmojis } from './emoji';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getSelection, $isRangeSelection } from 'lexical';

function EmojiPickerButton({emoji,setShowPicker}){
    const [editor] = useLexicalComposerContext();
    
    const handleEmojiAddition  = () =>{
        // Insert the emoji (Unicode character) at the current cursor position
        editor.update(() => {
            const selection = $getSelection();
            if ($isRangeSelection(selection)) {
            selection.insertText(emoji.unicode);
            }
        });
        setShowPicker(false); // Close the picker after selecting an emoji
    }

    return(
        <button onClick={handleEmojiAddition} className='emoji-button aspect-square hover:bg-background-60 rounded-xl ' type='button'>
            {emoji?.unicode}
        </button>
    )
}

function EmojiPlugin() {
  const [showEmojiPicker,setShowEmojiPicker] = useState(false);
  const emojiRef = useRef();

    const handleClickOutside = (event) => {
        if(emojiRef.current && !emojiRef.current.contains(event.target)){
            setShowEmojiPicker(false);
        }
    }

    useEffect(() => {
        window.addEventListener('click', handleClickOutside);
        return () => window.removeEventListener('click', handleClickOutside);
    }, []);

  return (
    <div ref={emojiRef} onClick={()=>setShowEmojiPicker(!showEmojiPicker)} className={'relative cursor-pointer  p-3 w-10 h-10  rounded-xl ' + (showEmojiPicker ? "bg-accent-300" : "hover:bg-background-60")}>
        <p className='scale-[1.5] pb-7'>{"\u263A"}</p>
        {
            showEmojiPicker && 
            <div className=' absolute  grid grid-cols-5 top-11 left-0 z-30 h-[12rem] overflow-y-scroll scrollbar-hide min-w-[500%] max-w-[16rem] bg-background-40 rounded-xl p-2 drop-shadow-[0px_0px_20px_rgba(28,28,25,0.9)]'>
                {
                    combinedEmojis.map(emoji=>{
                        return <EmojiPickerButton key={emoji.name} emoji={emoji} setShowPicker={setShowEmojiPicker} />
                    })
                }
            </div>
        }
    </div>
  )
}

export default EmojiPlugin
