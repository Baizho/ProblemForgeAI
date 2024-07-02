import React from 'react'

import 'katex/dist/katex.min.css';
import Latex from "react-latex-next";

type Props = {
    text: string;
}

interface Message {
    center?: boolean,
    message: string
}

const ProblemText = (props: Props) => {
    let text = props.text;
    let str = "", res = "", inside = 0;

    for (let i = 0; i < text.length; i += 1) {
        if (text[i] === '-') str += "-";
        else {
            if (str.length > 1) {
                if (inside) res += `\\text{${str}}`;
                else res += `$\\text{${str}}$`;
            } else res += str;
            str = "";
            if (text[i] === '$') {
                inside ^= 1;
            }
            res += text[i];
        }
    }
    console.log(res);
    text = res;
    res = "", str = "", inside = 0;
    let first = 1;
    for (let i = 0; i < text.length; i += 1) {
        if (text[i] === '\n' && !first) {
            // console.log(i, text[i], text[i - 1]);
            if (str.length > 0) {
                str += "~\\\\";
            } else str += "\\\\";
            first = 0;
        } else if (text[i] === '\n' && first) first = 0;
        else {
            first = 1;
            if (str) {
                str += "~\\\\";
                // console.log(i, text[i], text[i - 1], str);
                if (inside) res += `${str}`;
                else res += `$${str}$`;
            }
            str = "";
            if (text[i] === '$') {
                inside ^= 1;
            }
            res += text[i];
        }
    } if (str) {
        str += "~\\\\";
        if (inside) res += `${str}`;
        else res += `$${str}$`;
    }
    // console.log(res);
    return (
        <>
            <Latex>{res}</Latex>
        </>
    )
}

export default ProblemText