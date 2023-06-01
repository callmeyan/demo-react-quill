import ReactQuill, {Quill} from "react-quill";

const Inline = ReactQuill.Quill.import('blots/inline');

class ReplaceParserBlot extends Inline {
    static create(value: any) {
        const node: HTMLElement = super.create();
        if (value && value.id) {
            node.setAttribute("data-replace", value.id);
            node.setAttribute("data-replace-text", value.text);
            // node.classList.add('text-replace-item')
        }

        // node.setAttribute('style', 'font-size:1.5em; color: red');
        // node.setAttribute('src', value.url);
        // node.addEventListener('click',()=>{
        //     console.log('node==>',value,)
        //     const blot = Quill.find(node)
        //     const offset = blot.offset(blot.scroll),length = blot.length()
        //     blot.setSelection(offset,length)
        //     console.log('blot',blot,offset,length)
        // });
        return node;
    }

    static value(node: HTMLElement) {
        console.log('33')
        return {
            // alt: node.getAttribute('alt'),
            url: node.getAttribute('src'),
            replace: node.hasAttribute('data-replace')
        };
    }

    static formats(node: HTMLElement) {
        // console.log('22', node)
        return {
            id: 'id_'+node.getAttribute('data-replace'),
            text: node.getAttribute('data-replace-text')
        };
    }

    format(name, value) {
        // console.log('name,value==>', name, value)
        // if (name === 'link' && value) {
        //     this.domNode.setAttribute('href', value);
        // } else {
        //     super.format(name, value);
        // }
    }

    formats() {
        const formats = super.formats();
        formats['replace'] = ReplaceParserBlot.formats(this.domNode);
        return formats;
    }
}

ReplaceParserBlot.blotName = 'replace';
ReplaceParserBlot.tagName = 'span';
ReplaceParserBlot.className = 'text-replace-item';
// ReactQuill.Quill.register('formats/em', ReplaceParserBlot);
ReactQuill.Quill.register(ReplaceParserBlot, true);
