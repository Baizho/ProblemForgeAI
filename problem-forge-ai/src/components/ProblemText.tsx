import React from 'react';
import 'katex/dist/katex.min.css';
import Latex from 'react-latex-next';

type Props = {
    text: string;
};

const ProblemText: React.FC<Props> = ({ text }) => {
    // Replace newline markers with LaTeX-friendly newlines
    let processedText = text.replace(/\$\\newline\$|\\newline/g, '\\n');

    let result = '';
    let currentStr = '';
    let insideDollarSign = false;

    // Process the text to handle LaTeX formatting
    for (let i = 0; i < processedText.length; i++) {
        const char = processedText[i];

        if (char === '-') {
            currentStr += '-';
        } else {
            if (currentStr.length > 1) {
                result += insideDollarSign ? `\\text{${currentStr}}` : `$\\text{${currentStr}}$`;
            } else {
                result += currentStr;
            }
            currentStr = '';

            if (char === '$') {
                insideDollarSign = !insideDollarSign;
            }
            result += char;
        }
    }

    processedText = result;
    result = '';
    currentStr = '';
    insideDollarSign = false;

    // Handle LaTeX formatting and newlines
    for (let i = 0; i < processedText.length; i++) {
        const char = processedText[i];

        if (char === '\n') {
            currentStr += currentStr.length > 0 ? '~\\\\' : '\\\\';
        } else {
            if (currentStr) {
                result += insideDollarSign ? `${currentStr}` : `$${currentStr}$`;
            }
            currentStr = '';

            if (char === '$') {
                insideDollarSign = !insideDollarSign;
            }
            result += char;
        }
    }

    if (currentStr) {
        result += insideDollarSign ? `${currentStr}` : `$${currentStr}$`;
    }

    return <Latex>{result}</Latex>;
};

export default ProblemText;
