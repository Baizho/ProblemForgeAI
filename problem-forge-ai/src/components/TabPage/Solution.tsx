import { Editor } from '@monaco-editor/react'
import React, { Dispatch, SetStateAction } from 'react'

type Props = {
    sol: string,
    setSol: Dispatch<SetStateAction<string>>,
    generateSolution: () => {}
}

const Solution = ({ sol, setSol, generateSolution }: Props) => {

    const lang = "cpp";
    return (
        <>
            <div className="w-full flex bg-gray-100 px-4 py-2 h-[40px]">
                <div className="font-semibold text-lg">Solution:</div>
                <button className="px-8 ml-4 bg-gray-200 border-[1px] border-gray-600 text-md" onClick={generateSolution}>Generate Solution</button>
            </div>
            <div className="h-[50%]">
                <Editor
                    width="100%"
                    language={lang}
                    // className="overflow-hidden"
                    theme="vs-dark"
                    value={sol}
                    onChange={(e) => { if (e) { setSol(e) } }}
                    options={{
                        inlineSuggest: {
                            enabled: true
                        },
                        fontSize: 16,
                        formatOnType: true,
                        autoClosingBrackets: "always",
                        minimap: { scale: 10 },
                        wordWrap: "on",
                        codeLens: true,
                        dragAndDrop: false,
                        mouseWheelZoom: true,
                    }}
                />
            </div>
        </>
    )
}

export default Solution