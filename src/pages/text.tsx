import React, { useRef, useState } from 'react';
import { QuillEditor } from '../components/quill/QuillEditor.tsx';

import { useMount } from 'ahooks';
import { cx } from '@emotion/css';
import IconArrowRight from '../components/icons/IconArrowRight.tsx';

const contentObject: any = {
  ops: [
    {
      attributes: { bold: true },
      insert: '作者：小飞飞，撰写于6月31日。',
    },
    { insert: '\n想当年，他所带领的军队以锐不可挡之势，' },
    {
      attributes: { bold: true },
      insert: '横扫大江南北',
    },
    { insert: '，可以说是在父兄基业上' },
    {
      insert: '既往开来',
      attributes: {
        replace: {
          origin: '既往开来',
          text: '继往开来',
          type: 'words',
        },
        bold: true,
      },
    },
    {
      insert:
        '既往开来，成就了一番伟业。原本偏安一隅的小国，从他的手中变成了十三个州，国人对这位领袖的敬意由然而生。',
    },
    {
      insert: '威望的增加、权利的扩张丝毫没有改变他原有的',
    },
    {
      attributes: {
        replace: {
          origin: '样',
          type: 'delete',
        },
      },
      insert: '样',
    },
    {
      insert:
        '样子，他迈步走进岳楼，回忆起在湖北省张家界市的一段往事。' +
        '那是一个薄雾蒙蒙的清晨，在急促行军途中他与一位素未谋面的人相逢，虽然之后并没有太多故事，却至今难以忘却，正当他的思绪陷入过往，' +
        '忽然一阵震天的马蹄声夹杂着士兵的喧闹传来，报：“敌人来袭，我方战线危机，望将军火速驰援”。' +
        '由于刚刚陷入过往的原因，他稍微愣了愣神，咆哮道：“大军听令，即刻出发”！军令如山。成群的士兵迅速从营房中跑出在校场上整齐队列，' +
        '方阵如虹、战马昂首、刀枪如林、战旗迎风飘扬，将士身上的盔甲在阳光照射下，闪耀着金属的光泽。' +
        '看着这支曾跟着他南征北战的队伍，他默默翻身登上战马，走在队伍最前面。营房外的道路两旁站满了欢送的百姓，大家希望将军能带领着军队，再次创造奇迹。',
    },
    {
      attributes: {
        replace: {
          origin: '湖北省张家界市',
          text: '湖南省张家界市',
          type: 'address',
        },
        // "bold":true,
      },
      insert: '湖北省张家界市',
    },
    {
      insert: '\n来源：',
    },
    {
      attributes: { link: 'https://zj.xfyun.cn/exam/text' },
      insert: '讯飞',
    },
    { insert: '\n' },
  ],
};
// 地名纠错 成语纠错
type ReplaceItemProp = {
  id: number;
  item: {
    origin: string;
    text?: string;
    type: 'address' | 'delete' | 'words' | string;
  };
  onCheck?: () => void;
  onCancel?: () => void;
  onClick?: () => void;
};

enum ReplaceState {
  Default,
  Confirm,
  Cancel,
}

const zeroFill = (v: any) => String(v).padStart(2, '0');
const ReplaceItem: React.FC<ReplaceItemProp> = (prop) => {
  const [state, setState] = useState<ReplaceState>(ReplaceState.Default);
  return (
    <div
      className={cx('replace-item', `replace-type-${prop.item.type}`)}
      onClick={prop.onClick}
    >
      <div className="data">
        <span className="id">{zeroFill(prop.id)}</span>
        <span className="origin">{prop.item.origin}</span>

        {prop.item.type != 'delete' ? (
          <>
            <span className="arrow">
              <IconArrowRight />
            </span>
            <span className="text">{prop.item.text}</span>
          </>
        ) : (
          <span className="delete-text">(删除)</span>
        )}
      </div>
      <div className="action">
        <span>xx</span>
        <span>xx</span>
      </div>
    </div>
  );
};
const TextPage: React.FC = () => {
  const editorRef = useRef<HTMLElement>(null);
  const [selectNode, setSelectNode] = useState<HTMLElement>();
  const handleEditorClick = (e: React.MouseEvent<HTMLElement>) => {
    const span = e.target as HTMLSpanElement;
    if (span.classList.contains('text-replace-item')) {
      // message.info("测试" + span.innerText)
      e.preventDefault();
      e.stopPropagation();
      return;
    }
  };
  const handleReplaceItemClick = (p: any) => {
    const id = p.attributes.replace.id;
    const node = editorRef.current?.querySelector(
      `span[data-replace=id_${id}]`
    );
    if (node) {
      // console.log(node)
      setSelectNode(node);
    }
  };
  useMount(() => {
    if (editorRef.current) {
      console.log(editorRef.current);
    }
  });
  const opsList: any[] = contentObject.ops.filter((p: any, id: number) => {
    const _replace = p.attributes && p.attributes.replace;
    if (_replace) {
      p.attributes.replace.id = id;
    }
    return _replace;
  });

  return (
    <div className={'page-text'}>
      <div className="page-block-article">
        <div className="page-block-content" ref={editorRef}>
          <QuillEditor
            selected={selectNode}
            onClick={handleEditorClick}
            editContent={contentObject}
          />
        </div>
        <div className="page-block-control">
          <div className="replace-content-container">
            {opsList.map((p, i) => (
              <ReplaceItem
                key={i}
                id={i + 1}
                item={p.attributes && p.attributes.replace}
                onClick={() => {
                  handleReplaceItemClick(p);
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default TextPage;
