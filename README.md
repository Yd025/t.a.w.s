# 🎓 T.A.W.S. (Teaching Assistant With Safeguards)

**An AWS-powered AI teaching assistant that guides students without giving away the answers.** 

[![AWS Bedrock](https://img.shields.io/badge/AWS-Bedrock-FF9900?logo=amazonaws)](https://aws.amazon.com/bedrock/)
[![AWS Lambda](https://img.shields.io/badge/AWS-Lambda-FF9900?logo=awslambda)](https://aws.amazon.com/lambda/)
[![Amazon S3](https://img.shields.io/badge/Amazon-S3-569A31?logo=amazons3)](https://aws.amazon.com/s3/)
[![Amazon DynamoDB](https://img.shields.io/badge/Amazon-DynamoDB-4053D6?logo=amazondynamodb)](https://aws.amazon.com/dynamodb/)

## 🚀 The Problem
Professors want to integrate AI into their courses to provide 24/7 student support, but standard LLMs easily act as "cheat codes" by writing full essays or completing code assignments. 

## 💡 The Solution
**T.A.W.S.** is a specialized AI teaching assistant that uses **Amazon Bedrock Guardrails** to actively refuse to do the work for the student. Instead of giving direct answers, it provides Socratic guidance, hints, and conceptual explanations based *strictly* on the professor's uploaded syllabus and course materials.

## 🛠️ Architecture & AWS Integration
This project leverages a serverless AWS architecture:

*   **Amazon S3 (Knowledge Base):** Acts as the single source of truth, storing the professor's syllabus, lecture slides, and assignment rubrics.
*   **Amazon Bedrock (The Brain & The Bouncer):** 
    *   Uses **Knowledge Bases** (RAG) to ensure the AI only pulls answers from the approved S3 course materials.
    *   Uses **Guardrails** to intercept and block prompts asking for direct code implementations, full essays, or off-topic queries.
*   **AWS Lambda (The Middleman):** Handles API requests from the frontend, routes prompts to Bedrock, evaluates guardrail triggers, and processes the response.
*   **Amazon DynamoDB (The Analytics):** Logs every interaction, specifically tracking when a guardrail is triggered to alert the professor of potential academic integrity risks or widespread class confusion.

## ✨ Key Features
- **Strict Contextual Grounding:** If a question isn't covered in the S3 syllabus, the AI won't answer it.
- **Anti-Cheating Guardrails:** Plain-English rules block the generation of direct homework solutions.
- **Professor Intervention Dashboard:** Real-time telemetry powered by DynamoDB shows professors exactly what concepts students are struggling with and who is trying to bypass the system.

## 🏁 How to Run Locally
*(Add your installation steps, environment variables, and run commands here before you submit!)*