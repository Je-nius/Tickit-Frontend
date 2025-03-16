"use client";

import SubmitButton from "components/layouts/SubmitButton";
import { useState } from "react";

export default function Qna() {
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState("");
  const [contents, setContents] = useState("");
  const [file, setFile] = useState("");
  const [fileName, setFileName] = useState("");

  const onSelectFile = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setFileName(selectedFile.name);
  };

  const onSaveQna = () => {
    const formData = new FormData();
    const datas = {
      email: email,
      category: category,
      contents: contents,
    };
    formData.append(
      "PostDto",
      new Blob([JSON.stringify(datas)], {
        type: "application/json",
      })
    );
    formData.append("files", file);
    console.log(formData);

    fetch("http://localhost:8080/mypage/qna", {
      method: "POST",
      body: formData,
    })
      .then((res) => {
        console.log("qna 등록 성공" + res);
      })
      .catch((err) => {
        console.log(err + "게시물 등록 오류");
      });
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <h1 className="font-bold text-2xl">1:1 문의하기</h1>
      <div className="flex flex-col gap-2 p-2 rounded-lg">
        <h1 className="text-lg font-semibold">답변 받을 이메일 주소</h1>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tickit@naver.com"
          className="w-full h-12 px-4 text-lg outline-none border border-gray-400 rounded-sm"
        />

        <h1 className="text-lg font-semibold">문의 유형</h1>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="ex) 티켓 배송"
          className="w-full h-12 px-4 text-lg outline-none border border-gray-400 rounded-sm"
        />

        <h1 className="text-lg font-semibold">문의 내용</h1>
        <textarea
          value={contents}
          onChange={(e) => setContents(e.target.value)}
          placeholder="문의 내용을 자세히 입력해주세요."
          className="w-full h-30 px-4 pt-2 text-lg outline-none border border-gray-400 rounded-sm"
        />

        <h1 className="text-lg font-semibold">첨부파일</h1>

        <form
          className="text-gray-500 border border-gray-400 rounded-sm px-2 py-2 h-10"
          name="form"
          method="post"
          encType="multipart/form-data"
        >
          <input
            type="file"
            name="fileName"
            onChange={onSelectFile}
            accept=".png, .jpg, .jpeg, .pdf, .docx, .hwp"
            multiple
          />
        </form>
      </div>

      <SubmitButton onClick={onSaveQna} text="등록하기" />
    </div>
  );
}
