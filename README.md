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

## ☁️ AWS Cloud Architecture

T.A.W.S. (Teaching Assistant With Safeguards) is powered by a fully serverless, event-driven AWS architecture designed for scalability, security, and educational integrity. 

* **Amazon Bedrock:** The core AI orchestration and routing layer.
  * **Agents:** Utilizes the ReAct (Reason and Action) framework to process student queries, decide when to search the syllabus, or when to trigger an action.
  * **Knowledge Bases:** Employs a vector database to ground the AI strictly in approved course materials via RAG (Retrieval-Augmented Generation).
  * **Guardrails:** Implements strict content filters, prompt injection prevention, and a custom blocked-topics list to actively prevent cheating and the delegation of coursework.
* **AWS Lambda:** Handles serverless backend execution via Python 3.12.
  * Powers the core REST API chat handler that bridges the frontend and Bedrock.
  * Executes Bedrock Action Groups (e.g., the `report_guardrail_breach` function) to handle dynamic backend logic and alerts.
* **Amazon API Gateway:** Acts as the secure front door to the backend pipeline. Configured as a REST API with Lambda Proxy Integration, strict CORS policies, and Usage Plans to throttle request rates and prevent abuse.
* **Amazon S3 (Simple Storage Service):** Serves as the secure document repository (`taws-course-material-storage`), holding the flattened course syllabi, lecture slides, and reference materials for Bedrock ingestion.
* **AWS IAM (Identity and Access Management):** Manages the principle of least privilege across the application, handling execution roles for Lambda-to-Bedrock communication and securing CLI access for deployment.
* **AWS Amplify:** Hosts the frontend web application, providing lightning-fast global content delivery and automatic SSL (HTTPS) to ensure secure, encrypted communication with the API Gateway.

## ✨ Key Features
- **Strict Contextual Grounding:** If a question isn't covered in the S3 syllabus, the AI won't answer it.
- **Anti-Cheating Guardrails:** Plain-English rules block the generation of direct homework solutions.
- **Professor Intervention Dashboard:** Real-time telemetry powered by DynamoDB shows professors exactly what concepts students are struggling with and who is trying to bypass the system.

## 🏁 How to Run Locally
*(Add your installation steps, environment variables, and run commands here before you submit!)*