import ProblemDto from "./dtos/Problem.dto";
import { jsonrepair } from "jsonrepair";
import dJSON from 'dirty-json';
import Anthropic from "@anthropic-ai/sdk";

const claudeAI = new Anthropic({ apiKey: process.env.CLAUDE_KEY });


// Here are some examples:
// 1. Example in Russian: 
// {
//     "title": "Самый короткий путь в городе",
//     "statement": "Вы программист, который живет в городе.  Город представлен в виде графа с $n$ вершинами.  Между некоторыми вершинами есть дороги, которые соединяют их.  Каждая дорога имеет длину, которая представлена целым числом.  Вам нужно найти самый короткий путь между двумя заданными вершинами $s$ и $t$.",
//     "input": "В первой строке заданы два целых числа $n$ и $m$ $(1 \\le n \\le 10^5$, $0 \\le m \\le 10^5)$ — количество вершин и дорог соответственно.  В следующих $m$ строках заданы три целых числа $u$, $v$ и $w$ $(1 \\le u, v \\le n, 1 \\le w \\le 10^9)$ — номера вершин, которые соединяет дорога, и длина дороги.  В последней строке заданы два целых числа $s$ и $t$ ($1 \\le s, t \\le n$) — номера начальной и конечной вершины соответственно.  Гарантируется, что граф является связным, то есть из любой вершины можно добраться до любой другой вершины.",
//     "output": "Выведите длину самого короткого пути между вершинами $s$ и $t$.",
//     "example": {
//         "inputExample": "5 6\\n1 2 1\\n1 3 2\\n2 3 3\\n2 4 4\\n3 5 5\\n4 5 6\\n1 5",
//         "outputExample": "8",
//         "explanation": "Самый короткий путь из вершины $1$ в вершину $5$ проходит через вершины $1$, $2$, $4$, $5$.  Длина этого пути равна $1 + 4 + 3 = 8$."
//     }
// } 
// 2. Example in English:
// {
//     "title": "Maximum subarray sum",
//     "statement": "You have recently learned Kadanes algorithm and would like to test it out on a problem. Your friend gives you an array $a$ of length $n$ to test out your algorithm",
//     "input": "In the first line you are given a number $n$ --- the length of the array $(1 \\le n \\le 10^5)$. \\n In the second line you are given the array $a$. $(-10^9 \\le a_i \\le 10^9)$",
//     "output": "Print the maximum subarray sum",
//     "example: {
//         "inputExample": "5 \\n 2 -1 5 -10 2",
//         "outputExample": "5",
//         "explanation": "The answer is 6 because we take the subarray [1..3] with sum 2 + (-1) + 5 = 6. It is guaranteed this is the maximum possible.",
//     }
// }

const systemPromptProblem = `
Generate a competitive programming problem using the following guidelines:

1. Structure the problem with these sections: title, statement, input, output, and example, EnglishInput, EnglishOutput.
2. Use the Codeforces Polygon style format.
3. Do not create IOI-style or interactive problems.
4. For LaTeX formatting:
   - Use $...$ to wrap LaTeX commands
   - Use \\\\le for less than or equal to (e.g. $1 \\\\le n \\\\le 100$)
5. Please provide your response in strict JSON format only, with no other text. Ensure all double quotes are properly escaped and the JSON is valid:
{
    "title": "Problem Title",
    "statement": "Problem statement...",
    "input": "Input description...",
    "output": "Output description...",
    "example": {
        "inputExample": "Sample input",
        "outputExample": "Sample output",
        "explanation": "Explanation of the example"
    }
    "EnglishInput": "Input description in English",
    "EnglishOutput" : "Output description in English"
}

6. The problem can be in any language, the EnglishInput and EnglishOutput should always be in English though.


Please generate a single competitive programming problem following these guidelines.`

const systemPromptTest = `You generate test cases for a competitive programming problem by writing a python script. 
You provide only the Python code, without explanations.`;

const systemPromptChecker = `A checker is a file that makes sure the output of each testcase is in the correct format.
You need to pick a checker by choosing from the options given to you. 
You must only return one of the options, you do not explain anything or write anything extra.
`

const systemPromptSolution = `You are a professional competitive programmer that solves problems using any language.
You will be given a competitive programming problem. Return a solution to the problem in the language requested.
You provide only the code, without explanations.`;

class ClaudeService {

    async generateProblem(ideaPrompt: string, problemTopic: string, problemLevel: string, problemLanguage: string): Promise<string> {
        try {
            const res = await claudeAI.messages.create({
                model: "claude-3-5-sonnet-20240620",
                temperature: 0,
                max_tokens: 1500,
                system: systemPromptProblem,
                messages: [
                    {
                        role: "user",
                        content: `Here is the idea of the competitive programming problem your students want to generate: ${ideaPrompt}.
                                Here are additional rules you must follow:
                                1. Return your answer in the language: ${problemLanguage}.
                                2. The problem will use the following competitive programming topics: ${problemTopic}.
                                3. Make sure the problem is around the same complexity as your student wants, he wants a problem with complexity around: ${problemLevel} level.
                                `
                    }
                ]
            });
            const response = (res.content[0] as Anthropic.TextBlock).text
            // console.log(response);
            return jsonrepair(response);
        } catch (err: any) {
            console.log("error generating content from claude", err);
            return `{"message": "error bruh"}`;
        }
    }

    // async generateTestGenerater(input: string, output: string, testInput: string, testOutput: string): Promise<string> {
    //     try {
    //         const res = await genModelTest.generate({
    //             prompt: `
    //             Create a Python script for generating test cases for a competitive programming problem:
    //             1. Use sys.argv[1] for the total number of test cases.
    //             2. Store the test cases as strings in a 'test_cases' string array.

    //             Problem constraints:
    //             Input: ${input},
    //             Output: ${output}

    //             Here is an example test, try to make the format the same as this test:
    //             ${testInput}

    //             Requirements:
    //             - Generate random values within specified ranges.
    //             - Include edge cases (5-10% of total, min 1, max 10).
    //             - Handle various input types (integers, floats, strings, arrays).

    //             The script should:
    //             1. Define functions for random and edge cases.
    //             2. Calculate edge and random case counts.
    //             3. Generate all test cases as strings.
    //             4. Return 'test_cases' array containing all generated test case strings.

    //             Provide only the Python code, without explanations.
    //         `
    //         });
    //         const resText = res.text;
    //         return resText.slice(10, resText.length - 3);
    //     } catch (err: any) {
    //         console.log("error generating test generator", err);
    //         return "error bruh"
    //     }
    // }

    // async getChecker(output: string): Promise<string> {
    //     try {
    //         const res = await genModelChecker.generate({
    //             prompt: `
    //             You have to choose a checker that best suits this output: ${output}.
    //             Options are given in the format: "name" - "format".
    //             Here are the options of checker you are given:
    //             1. "std::fcmp.cpp" - "Lines, doesn't ignore whitespaces",
    //             2. "std::hcmp.cpp" - "Single huge integer",
    //             3. "std::lcmp.cpp" - "lcmp.cpp - Lines, ignores whitespaces",
    //             4. "std::ncmp.cpp" - "Single or more int64, ignores whitespaces",
    //             5. "std::nyesno.cpp" - "Zero or more yes/no, case insensitive",
    //             6. "std::rcmp4.cpp" - "Single or more double, max any error 1E-4",
    //             7. "std::rcmp6.cpp" - "Single or more double, max any error 1E-6",
    //             8. "std::rcmp9.cpp" - "Single or more double, max any error 1E-9",
    //             9. "std::wcmp.cpp" - "Sequence of tokens",
    //             10. "std::yesno.cpp" - "Single yes or no, case insensitive".
    //             11. "std::none" - "If the checkers above aren't suitable for the output".
    //             Return the option you choose by its name.
    //         `
    //         });
    //         const resText = res.text.replaceAll(/(\r\n|\n|\r)/gm, "").trim();
    //         return resText;
    //     } catch (err: any) {
    //         console.log("error getting checker", err);
    //         return "error bruh";
    //     }
    // }

    async generateSolution(statement: string, input: string, output: string, testInput: string, testOutput: string, notes: string, timeLimit: number, memoryLimit: number, userLang: string) {
        try {
            const res = await claudeAI.messages.create({
                model: "claude-3-5-sonnet-20240620",
                temperature: 0,
                max_tokens: 1500,
                system: systemPromptSolution,
                messages: [
                    {
                        role: "user",
                        content: `You are given the following competitive programming problem:
                        statement: ${statement},
                        input: ${input},
                        output: ${output}, 
                        sample input: ${testInput},
                        sample output: ${testOutput},
                        sample explanation: ${notes},
                        time limit: ${timeLimit} ms,
                        memory limit: ${memoryLimit} MB.
        
                        Solve the problem and write your solution in ${userLang} and return it. You must provide only the code. No extra text is allowed.
                                `
                    }
                ]
            });
            const resText = (res.content[0] as Anthropic.TextBlock).text;
            // console.log(resText);
            // if (userLang === "cpp") return resText.slice(7, resText.length - 3);
            // else if (userLang === "py") return resText.slice(9, resText.length - 3);
            // else if (userLang === "c") return resText.slice(4, resText.length - 3);
            // else if (userLang === "java") return resText.slice(8, resText.length - 3);
            return resText;
        } catch (err: any) {
            console.log("error in generating solution", err);
            return "error bruh";
        }
    }
}

export default ClaudeService;
