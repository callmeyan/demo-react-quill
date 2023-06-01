import {cx} from "@emotion/css";
import {SVGProps} from "react"

const IconArrowRight = (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
    <svg
        className={cx('svg-icon icon-arrow icon-arrow-right',props.className)}
        viewBox="0 0 1024 1024" version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        width="32" height="32"
        {...props}
    >
        <path d="M64 552.013h836v64h-836z"></path>
        <path d="M768 408.987l192 207.026h-192z"></path>
    </svg>)
export default IconArrowRight;
