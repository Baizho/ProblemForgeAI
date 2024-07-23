import ProblemDto from "./dtos/Problem.dto";
import { jsonrepair } from "jsonrepair";
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

const systemPromptProblem = `You are a competitive programmer creating a problem for your student. 
Generate a problem with this structure: title, statement, input, output, example. 
Don't create IOI-style or interactive problems. Use the format of Codeforces Polygon. 
Important: 1. Use two backslashes before 'le' in inequalities, like this: \\\\le 2. Wrap the Latex commands with $.
Return the problem in this JSON format:
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
}
Here are examples:
{
    "title": "String Length",
    "statement": "You have to help your child solve a problem that uses a string! The problem is that you are given a string $s$, you must print its length.",
    "input": "You are given a string $s$. The length of the string is at most 100000",
    "output": "Print the string length.",
    "example": {
        "inputExample": "abedge",
        "outputExample": "6",
        "explanation": "The length of the string is 6, so the answer is 6."
    }
}
{
    "title": "Even number",
    "statement": "You are interested if the number $n$ is even or not",
    "input": "You are given a number $n$. $(1 \\\\le n \\\\le 10^9)$",
    "output": "Print "YES" (without quotes) if the number is even, otherwise print "NO" (without quotes)",
    "example": {
        "inputExample": "10",
        "outputExample": "YES",
        "explanation": "The number is even, so the answer is YES"
    }
}
{
    "title": "Sum",
    "statement": "Your child has finished first grade and has learned addition. To test him, you give him the problem of adding two numbers. Write a program that can check the answer of your problem",
    "input": "You are given two numbers $a$ and $b$. $(1 \\\\le a, b \\\\le 10^18)$",
    "output": "Print the sum of the two numbers",
    "example": {
        "inputExample": "2 1000",
        "outputExample": "1002",
        "explanation": "The answer is 1002 because 2 + 1000 = 1002"
    }
}
{
    "title": "Maximum subarray sum",
    "statement": "You have recently learned Kadanes algorithm and would like to test it out on a problem. Your friend gives you an array $a$ of length $n$ to test out your algorithm",
    "input": "In the first line you are given a number $n$ --- the length of the array $(1 \\\\le n \\\\le 10^5)$. \\n In the second line you are given the array $a$. $(-10^9 \\\\le a_i \\\\le 10^9)$",
    "output": "Print the maximum subarray sum",
    "example: {
        "inputExample": "5 \\n 2 -1 5 -10 2",
        "outputExample": "5",
        "explanation": "The answer is 6 because we take the subarray [1..3] with sum 2 + (-1) + 5 = 6. It is guaranteed this is the maximum possible.",
    }
}
{
    "title": "Present",
    "statement": "Nurmyrza got an array $a$ of length $n$ as a present from his friend. He would like to rearrange the array such that the following value is minimum. Consider $pr_i$ equals to the sum of prefix $i$ of the rearranged array $a$. $\\sum_{i = 1}^{n}pr_i * a_i * i$ Can you help him find the minimum possible value.",
    "input": "The first line gives an integer $n$. $(1 \\\\le n \\\\le 8)$. The next lines gives the array $a$. $(-10^6 \\\\le a_i \\\\le 10^6)$.",
    "output": "Print the minimum possible value.",
    "example": {
        "inputExample": "3 \\n 1 2 4",
        "outputExample": "61\\n",
        "explanation": "We can rearrange the array to become $(4, 2, 1)$ and the value will be equal to $4 * 4 * 1 + 6 * 2 * 2 + 7 * 1 * 3$ = 16 + 24 + 21 = 61.",
    }
    
}
If your student asks in Russian, here is an example of how you should respond:
{
    "title": "Шарки и рыбы",
    "statement": "В океане $n$ акул.  Каждая акула хочет съесть как можно больше рыбы.  Известно, что $i$-я акула может съесть $a_i$ рыбы за день. В океане всего $k$ рыб. Нужно узнать максимальное количество акул, которые могут съесть хотя бы одну рыбу.",
    "input": "В первой строке заданы два целых числа $n$ и $k$ $(1 \\\\le n, k \\\\le 10^9)$ — количество акул и рыб соответственно. \\n Во второй строке даны $n$ целых чисел $a_1$, $a_2$, ..., $a_n$ $(1 \\\\le a_i \\\\le 10^9)$ — количество рыбы, которое может съесть каждая акула.",
    "output": "Выведите максимальное количество акул, которые могут съесть хотя бы одну рыбу.",
    "example": {
        "inputExample": "5 10\\n1 2 3 4 5",
        "outputExample": "5",
        "explanation": "Все пять акул могут съесть хотя бы по одной рыбе, так как общее количество рыбы $10$ больше, чем сумма потребностей акул $1 + 2 + 3 + 4 + 5 = 15$."
    }
}
Here is another example in Russian:
{
    "title": "Самый короткий путь в городе",
    "statement": "Вы программист, который живет в городе.  Город представлен в виде графа с $n$ вершинами.  Между некоторыми вершинами есть дороги, которые соединяют их.  Каждая дорога имеет длину, которая представлена целым числом.  Вам нужно найти самый короткий путь между двумя заданными вершинами $s$ и $t$.",
    "input": "В первой строке заданы два целых числа $n$ и $m$ $(1 \\\\le n \\\\le 10^5$, $0 \\\\le m \\\\le 10^5)$ — количество вершин и дорог соответственно.  В следующих $m$ строках заданы три целых числа $u$, $v$ и $w$ $(1 \\\\le u, v \\\\le n, 1 \\\\le w \\\\le 10^9)$ — номера вершин, которые соединяет дорога, и длина дороги.  В последней строке заданы два целых числа $s$ и $t$ ($1 \\\\le s, t \\\\le n$) — номера начальной и конечной вершины соответственно.  Гарантируется, что граф является связным, то есть из любой вершины можно добраться до любой другой вершины.",
    "output": "Выведите длину самого короткого пути между вершинами $s$ и $t$.",
    "example": {
        "inputExample": "5 6\\n1 2 1\\n1 3 2\\n2 3 3\\n2 4 4\\n3 5 5\\n4 5 6\\n1 5",
        "outputExample": "8",
        "explanation": "Самый короткий путь из вершины $1$ в вершину $5$ проходит через вершины $1$, $2$, $4$, $5$.  Длина этого пути равна $1 + 4 + 3 = 8$."
    }
} 
If your student asks in Kazakh, here is an example of how you should respond:
{
    "title": "Кәмпит",
    "statement": "Досын бугін $n$ кәмпит берді. $i$-ші кәмпиттың тәттілігі $a_i$. Сіз $i$-ші кәмпитті жей аласыз егер оның тәттілігі сіздің шектеуіңіз $x$-тан асып кетпесе, әйтпесе тісіңіз ауырып қалады. Сіз бугін неше кәмпит жей аласыз?.",
    "input": "Бірінші жолда екі бутін сан $(1 \\\\le n \\\\le 10^5, 1 \\\\le x \\\\le 10^9)$ -- кәмпиттердің саны және шектеуіңіз. \\n \\n Екінші жолда $n$ бутін сан  $a_1, a_2, ..., a_n$ $(1 \\\\le a_i \\\\le 10^9)$.",
    "output": "Бугін неше кәмпит жей алатынызды шығарыңыз.",
    "example": {
        "inputExample": "5 3\\n1 5 4 2 3",
        "outputExample": "3",
        "explanation": "Мысалда жауап 3, себебі сіз бірінші, төртінші және бесінші кәмпиттер жей аласыз, олардың тәттілігі уштен кішкентай.",
    }
} `

const systemPromptTest = `You generate test cases for a competitive programming problem by writing a python script. 
You provide only the Python code, without explanations.`;

const systemPromptChecker = `A checker is a file that makes sure the output of each testcase is in the correct format.
You need to pick a checker by choosing from the options given to you. 
You must only return one of the options, you do not explain anything or write anything extra.
`

const systemPromptSolution = `You are a professional competitive programmer that solves problems using any language.
You will be given a competitive programming problem. Return a solution to the problem in the language requested.
You provide only the code, without explanations.`;

const genModelProblem = genAI.getGenerativeModel({ model: "gemini-1.5-flash", systemInstruction: systemPromptProblem, generationConfig: { "response_mime_type": "application/json" } });
const genModelTest = genAI.getGenerativeModel({ model: "gemini-1.5-flash", systemInstruction: systemPromptTest });
const genModelChecker = genAI.getGenerativeModel({ model: "gemini-1.5-flash", systemInstruction: systemPromptChecker });
const genModelSolution = genAI.getGenerativeModel({ model: "gemini-1.5-flash", systemInstruction: systemPromptSolution });
const genModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

class GeminiService {

    // async getResult() {
    //     try {
    //         const res = await genModel.generateContent("Print me this sentences 'hello\\theworld\\hey'");
    //         const mess = await res.response;
    //         return mess.text();
    //     } catch (err: any) {
    //         console.log("there was an error getting the mesasge", err);
    //     }
    // }

    // 5. In the Input, Output sections, try to explain in detail of the format you will print characters or words or numbers.
    async generateProblem(ideaPrompt: string, problemTopic: string, problemLevel: string, problemLanguage: string): Promise<string> {
        try {
            // console.log("you are generatig content!");
            const res = await genModelProblem.generateContent(ideaPrompt + `
            Here are additional rules you must follow:
            1. Return your answer in the language: ${problemLanguage}.
            2. The problem will use the competitive programming topic: ${problemTopic}.
            3. Make sure the problem is around the same complexity as your students wants, he wants a problem with complexity around: ${problemLevel}.
            4. Remember to use two backslashes otherwise it will not work!
             `);
            // console.log(res);
            const result = await res.response;
            // console.log(await result.text());
            return jsonrepair(result.text());
            // return `{yolo: "hey"}`;
        } catch (err: any) {
            console.log("error generating content from gemini", err);
            return "error bruh";
        }
    }

    async generateTestGenerater(input: string, output: string, testInput: string, testOutput: string): Promise<string> {
        try {
            const res = await genModelTest.generateContent(`
            Create a Python script for generating test cases for a competitive programming problem:
            1. Use sys.argv[1] for the total number of test cases.
            2. Store the test cases as strings in a 'test_cases' string array.
        
            Problem constraints:
            Input: ${input},
            Output: ${output}
        
            Here is an example test, try to make the format the same as this test:
            ${testInput}
        
            Requirements:
            - Generate random values within specified ranges.
            - Include edge cases (5-10% of total, min 1, max 10).
            - Handle various input types (integers, floats, strings, arrays).
        
            The script should:
            1. Define functions for random and edge cases.
            2. Calculate edge and random case counts.
            3. Generate all test cases as strings.
            4. Return 'test_cases' array containing all generated test case strings.
        
            Provide only the Python code, without explanations.
        `);

            const result = await res.response;
            const resText: string = result.text();
            // console.log(await result.text());
            return resText.slice(10, resText.length - 3);
        } catch (err: any) {
            console.log("error generating test generator", err);
            return "error bruh"
        }
    }

    async getChecker(output: string): Promise<string> {
        try {
            const res = await genModelChecker.generateContent(`
            You have to choose a checker that best suites this output: ${output}.
            Options are given in the format: "name" - "format".
            Here are the options of checker you are given:
            1. "std::fcmp.cpp" - "Lines, doesn't ignore whitespaces",
            2. "std::hcmp.cpp" - "Single huge integer",
            3. "std::lcmp.cpp" - "lcmp.cpp - Lines, ignores whitespaces",
            4. "std::ncmp.cpp" - "Single or more int64, ignores whitespaces",
            5. "std::nyesno.cpp" - "Zero or more yes/no, case insensetive",
            6. "std::rcmp4.cpp" - "Single or more double, max any error 1E-4",
            7. "std::rcmp6.cpp" - "Single or more double, max any error 1E-6",
            8. "std::rcmp9.cpp" - "Single or more double, max any error 1E-9",
            9. "std::wcmp.cpp" - "Sequence of tokens",
            10. "std::yesno.cpp" - "Single yes or no, case insensetive".
            11. "std::none" - "If the checkers above aren't suitable for the output".
            Return the option you choose by its name.
            `)
            const result = await res.response;
            const resText: string = result.text().replaceAll(/(\r\n|\n|\r)/gm, "").trim();
            return resText;
        } catch (err: any) {
            console.log("error getting checker", err);
            return "error bruh";
        }
    }

    async generateSolution(statement: string, input: string, output: string, testInput: string, testOutput: string, notes: string, timeLimit: number, memoryLimit: number, userLang: string) {
        try {
            const res = await genModelSolution.generateContent(`
            You are given the following competitive programming problem:
            statement: ${statement},
            input: ${input},
            output: ${output}, 
            sample input: ${testInput},
            sample output: ${testOutput},
            sample explanation: ${notes},
            time limit: ${timeLimit} ms,
            memory limit: ${memoryLimit} MB.

            Solve the problem and write your solution in ${userLang} and return it.
            `)
            const result = await res.response;
            const resText: string = result.text();
            // console.log(resText);
            if (userLang === "cpp") return resText.slice(7, resText.length - 3);
            else if (userLang === "py") return resText.slice(9, resText.length - 3);
            else if (userLang === "c") return resText.slice(4, resText.length - 3);
            else if (userLang === "java") return resText.slice(8, resText.length - 3);
            else return resText;
        } catch (err: any) {
            console.log("error in generating solution", err);
            return "error bruh";
        }
    }
}

export default GeminiService