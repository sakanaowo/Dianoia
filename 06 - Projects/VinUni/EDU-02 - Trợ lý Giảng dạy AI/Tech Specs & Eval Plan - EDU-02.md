---
type: project
status: active
project: "[[EDU-02 - Trợ lý Giảng dạy AI]]"
domains:
  - "[[Computing]]"
  - "[[Programming]]"
tags:
  - vinuni
  - edu-02
  - data-contracts
  - prompt-contract
  - eval-plan
  - deepeval
created: 2026-09-14
updated: 2026-09-14
aliases:
  - Tech Specs EDU-02
  - Eval Plan EDU-02
---

# Quy Chuẩn Kỹ Thuật, Data Contracts & Eval Plan — EDU-02

Tài liệu quy định chi tiết về **Hợp đồng dữ liệu (Data Contracts)**, **System Prompt Contract** và **Kế hoạch kiểm thử định lượng (Eval Plan)** cho dự án **`EDU-02: Trợ lý giảng dạy AI tổng hợp vướng mắc lớp học realtime`**.

---

## 1. Data Contracts (Quy Chuẩn Cấu Trúc Dữ Liệu)

Áp dụng nguyên tắc ranh giới dữ liệu từ [[Day 03 - Thiết kế Workflow và Kiểm soát Hệ thống AI|Day 03]]:

### 1.1. Ingestion Data Contract (Mock Canvas API JSON)
```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "CanvasDiscussionPost",
  "type": "object",
  "required": ["post_id", "anonymous_student_id", "timestamp", "topic_title", "content"],
  "properties": {
    "post_id": {"type": "string"},
    "anonymous_student_id": {"type": "string", "description": "SHA-256 hashed ID"},
    "timestamp": {"type": "string", "format": "date-time"},
    "topic_title": {"type": "string"},
    "content": {"type": "string", "description": "Nội dung câu hỏi thắc mắc"}
  }
}
```

### 1.2. Clustered Bottlenecks Output Contract
```json
{
  "title": "TopBottlenecksReport",
  "type": "object",
  "required": ["course_id", "week", "total_questions_analyzed", "bottlenecks"],
  "properties": {
    "course_id": {"type": "string"},
    "week": {"type": "integer"},
    "total_questions_analyzed": {"type": "integer"},
    "bottlenecks": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["cluster_id", "title", "severity", "frequency", "root_cause_explanation", "related_learning_outcome"],
        "properties": {
          "cluster_id": {"type": "string"},
          "title": {"type": "string"},
          "severity": {"type": "string", "enum": ["LOW", "MEDIUM", "HIGH", "CRITICAL"]},
          "frequency": {"type": "integer"},
          "root_cause_explanation": {"type": "string"},
          "related_learning_outcome": {"type": "string"}
        }
      }
    }
  }
}
```

### 1.3. Exercise Recommendation Output Contract (Bám Thang Bloom)
```json
{
  "title": "BloomExerciseRecommendation",
  "type": "object",
  "required": ["exercise_id", "target_bottleneck_id", "bloom_level", "question_prompt", "options", "correct_answer", "explanation", "citation"],
  "properties": {
    "exercise_id": {"type": "string"},
    "target_bottleneck_id": {"type": "string"},
    "bloom_level": {"type": "string", "enum": ["REMEMBER", "UNDERSTAND", "APPLY", "ANALYZE"]},
    "question_prompt": {"type": "string"},
    "options": {"type": "array", "items": {"type": "string"}},
    "correct_answer": {"type": "string"},
    "explanation": {"type": "string"},
    "citation": {"type": "string", "description": "Trích dẫn chính xác Slide/Giáo trình"}
  }
}
```

---

## 2. System Prompt Contract (Kỹ Nghệ Prompt as Code)

Áp dụng chuẩn mực System Prompt 4 khối từ [[Day 04 - Prompt Engineering và Tool Calling|Day 04]]:

```html
You are the AI Teaching Assistant Co-Pilot for University Course Instruction.

<persona>
- You are an expert pedagogical assistant specializing in computer science and AI education.
- Your mission is to analyze student confusion patterns, identify deep cognitive bottlenecks, and suggest grounded reinforcement exercises.
- Your tone is academic, objective, precise, and supportive of the Lead Instructor.
</persona>

<core_directives>
- You MUST only diagnose misconceptions based on the provided anonymized student discussions and quiz failure logs.
- You MUST ground all exercise suggestions strictly on the course syllabus and official learning outcomes provided in the context.
- NEVER invent concepts, terms, or exercise questions outside the provided course materials.
- NEVER publish or finalize any exercise without explicit Human-in-the-loop (HITL) approval from the Instructor.
- ALWAYS categorize proposed exercises according to Bloom's Revised Taxonomy (Remember, Understand, Apply, Analyze).
</core_directives>

<negative_constraints>
- If the student confusion is ambiguous or lacks sufficient context, state: "Chưa đủ dữ liệu để kết luận điểm nghẽn cho chủ đề này" and request manual instructor review.
- NEVER reveal or attempt to de-anonymize student identity tokens.
</negative_constraints>

<output_contract>
- Return all recommendations strictly adhering to the JSON schema: BloomExerciseRecommendation.
- Every exercise MUST include a verified citation pointing to the specific Lecture Slide or Reading Chapter.
</output_contract>
```

---

## 3. Kế Hoạch Đánh Giá Định Lượng (Eval Benchmark & Metrics)

Để hoàn thành mục tiêu **PLO 7 (Đánh giá và Tối ưu)** của chương trình:

```rich-table
---
version: 2
title: EVALUATION MATRIX (DEEPEVAL)
columns:
  - id: c_000001
    name: Tiêu chí đánh giá
    width: 197.2265625
  - id: c_000002
    name: Phương pháp đo lường
    width: 195.125
  - id: c_000003
    name: Ngưỡng Đạt
    width: 129.44921875
    align: center
  - id: c_000004
    name: Tác động
    width: 186.55078125
rows:
  - id: r_000001
    cells:
      c_000001: 1. RAG Faithfulness
      c_000002: DeepEval FaithfulnessMetric
      c_000003: ≥ 90%
      c_000004: Chống bịa
  - id: r_000002
    cells:
      c_000001: 2. Context Relevance
      c_000002: RAGAS Context Relevance
      c_000003: ≥ 85%
      c_000004: Đúng bài
  - id: r_000003
    cells:
      c_000001: 3. Bloom Taxonomy Accuracy
      c_000002: LLM-as-Judge (GPT-4o)
      c_000003: ≥ 85%
      c_000004: Đúng mức
  - id: r_000004
    cells:
      c_000001: 4. Clustering Homogeneity
      c_000002: Silhouette Score
      c_000003: ≥ 0.65
      c_000004: Gom chuẩn
  - id: r_000005
    cells:
      c_000001: 5. Instructor Acceptance Rate
      c_000002: "% Approved tại Gate"
      c_000003: ≥ 75%
      c_000004: Hữu ích
  - id: r_000006
    cells:
      c_000001: 6. End-to-End Latency
      c_000002: Batch Execution Time
      c_000003: < 60 giây
      c_000004: Realtime
  - id: r_000007
    cells:
      c_000001: 7. Cost Envelope
      c_000002: Token Cost per Course/Wk
      c_000003: < $0.30
      c_000004: Siêu rẻ
---
```

### 3.1. Bộ Dữ Liệu Kiểm Thử Chuẩn (Ground-truth Test Set)
Nhóm sẽ xây dựng bộ kiểm thử gồm:
* **40 Câu hỏi vướng mắc sinh viên mẫu:** Phân chia đều vào 4 chủ đề của một môn học (Ví dụ: Môn Học máy / Deep Learning):
  * Cụm 1: Hiểu sai cơ chế Backpropagation và Gradient Descent.
  * Cụm 2: Nhầm lẫn giữa Overfitting vs Underfitting và kỹ thuật Regularization.
  * Cụm 3: Lỗi chiều Tensor và tính toán Ma trận trong PyTorch.
  * Cụm 4: Câu hỏi nhiễu/ngoài lề (Test case kiểm tra độ lọc nhiễu).
* **10 Đề cương môn học chuẩn hóa** có gắn nhãn Learning Outcomes chi tiết.

### 3.2. Script Kiểm Thử Mẫu với DeepEval (Python Snippet)
```python
from deepeval.metrics import FaithfulnessMetric, ContextualRelevancyMetric
from deepeval.test_case import LLMTestCase

def evaluate_exercise_generation(question_prompt, context_chunks, generated_exercise):
    test_case = LLMTestCase(
        input=question_prompt,
        actual_output=generated_exercise,
        retrieval_context=context_chunks
    )
    
    faithfulness = FaithfulnessMetric(threshold=0.90)
    relevancy = ContextualRelevancyMetric(threshold=0.85)
    
    faithfulness.measure(test_case)
    relevancy.measure(test_case)
    
    return {
        "faithfulness_score": faithfulness.score,
        "is_faithful": faithfulness.is_successful(),
        "relevancy_score": relevancy.score
    }
```
