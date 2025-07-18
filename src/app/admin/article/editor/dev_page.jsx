"use client";
import { postArticle } from "@/api/fetcher";
import { ButtonPrimarySmall } from "@/components/Buttons";
import useBlogger from "@/hooks/useBlogger";
import { convert_rgba_to_hex } from "@/utils/pure_function";
import {
  AlignCenterOutlined,
  AlignLeftOutlined,
  AlignRightOutlined,
  BoldOutlined,
  FileImageOutlined,
  ItalicOutlined,
  OrderedListOutlined,
  StrikethroughOutlined,
  UnderlineOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { Button, ColorPicker, Flex, Input, Modal, Select } from "antd";
import Title from "antd/es/typography/Title";
import React, { useEffect, useRef, useState } from "react";

export default function Page() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [previewVisible, setPreviewVisible] = useState(false);
  const [color, setColor] = useState("#1677ff");

  const inputInsertImageRef = useRef();

  const {
    useAction,
    optionList,
    preview,
    EditorZone,
    onSetClassName,
    onSetInitHtmlContent,
  } = useBlogger();

  const submitArticle = async () => {
    const content = useAction.getHTML();
    if (!(title && content !== "<p></p>" && description)) {
      const temp = [];
      if (!title) temp.push("Title");
      if (content === "<p></p>") temp.push("Content");
      if (!description) temp.push("Description");
      window.alert(`Require ${temp.join(", ")}.`);
      return;
    }
    const password = window.prompt("Admin Password");
    const payload = {
      title,
      content,
      description,
      password,
    };
    await postArticle(payload).then((r) => {
      if (r.auth) {
        window.alert("Complete");
        setTitle("");
        useAction.onResetContent();
        setDescription("");
      } else {
        window.alert("Password is not correct!");
      }
    });
  };

  const onChangeTextColor = (e) => {
    const hex = convert_rgba_to_hex({ ...e.metaColor });
    setColor(hex);
    useAction.setColor(hex);
  };

  const onSetLink = () => {
    const url = window.prompt("url");
    useAction.setLink(url, "_blank");
  };

  return (
    <div className="max-w-[1250px] w-full mx-auto mb-[8rem]">
      <div className="mt-[8rem] mb-[1rem]">
        <h1>Article Editor</h1>
      </div>
      <section>
        <Title level={2}>Title</Title>
        <Input
          placeholder="Title"
          onChange={(val) => setTitle(val.target.value)}
        />
      </section>
      <section className="mt-[1rem]">
        <Title level={2}>Article Content</Title>
        {EditorZone}
      </section>
      <section className="article-toolbar">
        <div className="text-bar">
          <label>Text: </label>
          <BoldOutlined onClick={useAction.toggleBold} />
          <ItalicOutlined onClick={useAction.toggleItalic} />
          <UnderlineOutlined onClick={useAction.toggleUnderline} />
          <StrikethroughOutlined onClick={useAction.toggleStrike} />
          <UnorderedListOutlined onClick={useAction.toggleBulletList} />
          <OrderedListOutlined onClick={useAction.toggleOrderedList} />

          <AlignLeftOutlined onClick={useAction.setTextAlignLeft} />
          <AlignCenterOutlined onClick={useAction.setTextAlignCenter} />
          <AlignRightOutlined onClick={useAction.setTextAlignRight} />

          <div
            className="button-solid-color"
            onClick={() => useAction.setColor("#fa5456")}
          >
            <div className="bg-(--c)"></div>
          </div>
          <div
            className="button-solid-color"
            onClick={() => useAction.setColor("#fc8823")}
          >
            <div className="bg-(--a)"></div>
          </div>
          <div
            className="button-solid-color"
            onClick={() => useAction.setColor("#00b5bc")}
          >
            <div className="bg-(--d)"></div>
          </div>
          <div
            className="button-solid-color"
            onClick={() => useAction.setColor("#000")}
          >
            <div className="bg-black"></div>
          </div>
          <div
            className="button-solid-color"
            onClick={() => useAction.setColor("#fff")}
          >
            <div className="bg-white"></div>
          </div>

          <ColorPicker value={color} onChangeComplete={onChangeTextColor} />

          <div
            className="cursor-pointer underline text-blue-500"
            onClick={onSetLink}
          >
            Link
          </div>

          <Select
            defaultValue="paragraph"
            style={{ width: 150 }}
            onChange={(val) => {
              if (val === "paragraph") {
                useAction.setParagraph();
              } else if (val.startsWith("heading")) {
                const level = parseInt(val.replace("heading", ""), 10);
                useAction.setHeading(level);
              }
            }}
            options={optionList.headingOptions}
          />
          <Select
            //   defaultValue="16px"
            style={{ width: 100 }}
            onChange={(val) => useAction.setFontSize(val)}
            options={optionList.fontSizeOptions}
          />
          <Select
            //   defaultValue="Arial"
            style={{ width: 150 }}
            onChange={(font) => useAction.setFontFamily(font)}
            options={optionList.fontFamilyOption}
          />
        </div>
        <div className="image-bar">
          <label>Image: </label>
          <FileImageOutlined
            onClick={() => inputInsertImageRef.current.click()}
          />
          <input
            hidden
            ref={inputInsertImageRef}
            type="file"
            accept="image/*"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (file) {
                const reader = new FileReader();
                reader.onload = () => {
                  const imageUrl = reader.result?.toString();
                  useAction.insertImage({
                    src: imageUrl,
                    width: "300px",
                    height: "auto",
                    align: "center", // "left" | "center" | "right"
                  });
                };
                reader.readAsDataURL(file);
              }
            }}
          />

          <AlignLeftOutlined
            onClick={() => useAction.alignSelectedImage("left")}
          />
          <AlignCenterOutlined
            onClick={() => useAction.alignSelectedImage("center")}
          />
          <AlignRightOutlined
            onClick={() => useAction.alignSelectedImage("right")}
          />
        </div>
        <div className="button-bar">
          <button onClick={() => setPreviewVisible(true)}>Preview</button>
          <button onClick={submitArticle}>Submit</button>
        </div>
      </section>
      <section className="mt-[1rem]">
        <Title level={2}>Description</Title>
        <Input
          placeholder="Description"
          onChange={(val) => setDescription(val.target.value)}
        />
      </section>
      <Modal
        title={title || "Untitled"}
        open={previewVisible}
        onCancel={() => setPreviewVisible(false)}
        footer={null}
        width={1250}
      >
        {preview}
      </Modal>
    </div>
  );
}
