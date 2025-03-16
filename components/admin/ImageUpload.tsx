import React, { useState } from "react";

interface ImageUploaderProps {
  preview: string;
  setPreview: (preview: string) => void;
  setFile: (file: File) => void;
}

const ImageUpload: React.FC<ImageUploaderProps> = ({
  preview,
  setPreview,
  setFile,
}) => {
  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreview(objectUrl);
    }
  };

  return (
    <div className="w-1/3 flex flex-col items-center">
      <input
        type="file"
        onChange={onSelectFile}
        accept=".png, .jpg, .jpeg"
        style={{ display: "none" }}
        id="fileInput"
      />
      <label htmlFor="fileInput" className="cursor-pointer">
        <img
          src={preview}
          alt="미리보기 이미지"
          className="w-full h-auto object-cover border rounded-md"
          style={{ width: "180px", height: "254px", objectFit: "cover" }} // 고정된 크기와 비율 유지
        />
      </label>
      <span className="text-sm text-gray-500 mt-2">포스터를 선택하세요</span>
    </div>
  );
};

export default ImageUpload;
