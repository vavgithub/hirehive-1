import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext';
import {mergeRegister} from '@lexical/utils';
import {
  $getSelection,
  $isRangeSelection,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  KEY_DOWN_COMMAND,
  REDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  UNDO_COMMAND,
} from 'lexical';
import {
  $createListItemNode,
    $createListNode,
    $isListItemNode,
    $isListNode,
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  REMOVE_LIST_COMMAND
} from '@lexical/list'
import {useCallback, useEffect, useRef, useState} from 'react';
import BoldIcon from '../../../svg/Editor/BoldIcon';
import ItalicIcon from '../../../svg/Editor/ItalicIcon';
import LeftAligned from '../../../svg/Editor/LeftAligned';
import RightAligned from '../../../svg/Editor/RightAligned';
import CenterAlignedIcon from '../../../svg/Editor/CenterAlignedIcon';
import UnderlineIcon from '../../../svg/Editor/UnderlineIcon';
import BulletListIcon from '../../../svg/Editor/BulletListIcon';
import NumberedListIcon from '../../../svg/Editor/NumberedListIcon';
import EmojiPlugin from './EmojiPlugin';

const LowPriority = 1;

function ToolButton({Icon,command,commandType,isActive}){
  const [editor] = useLexicalComposerContext();

    return (
    <button
        type='button'
        onClick={() => {
          editor.dispatchCommand(command, commandType);
        }}
        className={'m-2 hover:bg-background-60 rounded-xl ' + (isActive ? 'bg-accent-300' : '')}
        aria-label="Format Bold">
            {Icon()}
      </button>
      )
}

function ListToolButton({Icon,isActive,isNumberedList}){
    const [editor] = useLexicalComposerContext();

    const handleRemoveList = ()=>{
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
    }

    const handleMakeList = ()=>{
        editor.update(()=>{
          const selection = $getSelection();
          if ($isRangeSelection(selection)) {
            const command = isNumberedList
              ? INSERT_ORDERED_LIST_COMMAND
              : INSERT_UNORDERED_LIST_COMMAND;


            // Dispatch the list command to finalize the change
            editor.dispatchCommand(command, undefined);
          }
        })
    }

      return (
      <button
          type='button'
          onClick={isActive ? handleRemoveList : handleMakeList}
          className={'m-2 hover:bg-background-60 rounded-xl ' + (isActive ? 'bg-accent-300' : '')}
          aria-label="Format Bold">
              {Icon()}
        </button>
        )
  }

function Divider() {
  return <div className='w-[1px]  min-h-[70%] bg-divide r-100' />;
}

export default function ToolbarPlugin({errors}) {
  const [editor] = useLexicalComposerContext();
  const toolbarRef = useRef(null);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);

  const [isLeftAligned, setIsLeftAligned] = useState(false);
  const [isCenterAligned, setIsCenterAligned] = useState(false);
  const [isRightAligned, setIsRightAligned] = useState(false);

  const [isStrikethrough, setIsStrikethrough] = useState(false);
  const [isBulletList, setIsBulletList] = useState(false);
  const [isNumberedList, setIsNumberedList] = useState(false);
  
  const $updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      // Update text format
      setIsBold(selection.hasFormat('bold'));
      setIsItalic(selection.hasFormat('italic'));
      setIsUnderline(selection.hasFormat('underline'));
      setIsStrikethrough(selection.hasFormat('strikethrough'));

      const alignedParent = selection.getNodes()[0]?.getParent();
      const alignment = alignedParent?.getFormatType('align'); // `align` key depends on your implementation
      
      setIsLeftAligned(alignment === 'left'); // Default alignment is usually `left`
      setIsCenterAligned(alignment === 'center');
      setIsRightAligned(alignment === 'right');

      const anchorNode = selection.anchor.getNode();
      const parentNode = anchorNode.getParent();
      const desiredParent = parentNode?.getParent();
      const isListItemNode = $isListItemNode(parentNode);
      const isListNode = $isListNode(parentNode);
        
      setIsBulletList((isListItemNode || isListNode) && (desiredParent.__tag === 'ul' || parentNode.__tag === 'ul'));
      setIsNumberedList((isListNode || isListItemNode) && (desiredParent.__tag === 'ol' || parentNode.__tag === 'ol'));
    }
  }, []);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({editorState}) => {
        editorState.read(() => {
          $updateToolbar();
        });
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        (_payload, _newEditor) => {
          $updateToolbar();
          return false;
        },
        LowPriority,
      ),
      editor.registerCommand(
        CAN_UNDO_COMMAND,
        (payload) => {
          setCanUndo(payload);
          return false;
        },
        LowPriority,
      ),
      editor.registerCommand(
        CAN_REDO_COMMAND,
        (payload) => {
          setCanRedo(payload);
          return false;
        },
        LowPriority,
      ),
    );
  }, [editor, $updateToolbar]);

  return (
    <div className={"absolute top-0 left-0 min-h-14 z-20 flex items-center bg-background-40 rounded-t-xl    " + (errors ? "w-[calc(100%-2px)] ml-[1px] mt-[1px]" : "w-full")} ref={toolbarRef}>
      {/* <button
        type='button'
        disabled={!canUndo}
        onClick={() => {
          editor.dispatchCommand(UNDO_COMMAND, undefined);
        }}
        className="toolbar-item spaced"
        aria-label="Undo">
        Undo
      </button>
      <button
        type='button'
        disabled={!canRedo}
        onClick={() => {
          editor.dispatchCommand(REDO_COMMAND, undefined);
        }}
        className="toolbar-item"
        aria-label="Redo">
        Redo
      </button>
      <Divider /> */}
      <ToolButton Icon={BoldIcon} command={FORMAT_TEXT_COMMAND} commandType={'bold'} isActive={isBold} />
      <ToolButton Icon={ItalicIcon} command={FORMAT_TEXT_COMMAND} commandType={'italic'} isActive={isItalic} />
      <ToolButton Icon={UnderlineIcon} command={FORMAT_TEXT_COMMAND} commandType={'underline'} isActive={isUnderline} />
      {/* <ToolButton Icon={()=><div>S</div>} command={FORMAT_TEXT_COMMAND} commandType={'strikethrough'} isActive={isStrikethrough} /> */}
      <Divider />
      <ToolButton Icon={LeftAligned} command={FORMAT_ELEMENT_COMMAND} commandType={'left'} isActive={isLeftAligned} />
      <ToolButton Icon={CenterAlignedIcon} command={FORMAT_ELEMENT_COMMAND} commandType={'center'} isActive={isCenterAligned} />
      <ToolButton Icon={RightAligned} command={FORMAT_ELEMENT_COMMAND} commandType={'right'} isActive={isRightAligned} />
      {/* <ToolButton Icon={()=><div>J</div>} command={FORMAT_ELEMENT_COMMAND} commandType={'justify'} isActive={isUnderline} /> */}
      <Divider />
      <ListToolButton Icon={BulletListIcon} isNumberedList={false} isActive={isBulletList} />
      <ListToolButton Icon={NumberedListIcon} isNumberedList={true} isActive={isNumberedList} />
      <Divider />
      <EmojiPlugin/>
    </div>
  );
}