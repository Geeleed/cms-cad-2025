"use client";
import useBlogger from "@/hooks/useBlogger";
import { convert_rgba_to_hex } from "@/utils/pure_function";
import {
  AlignCenterOutlined,
  AlignLeftOutlined,
  AlignRightOutlined,
  BoldOutlined,
  FileImageOutlined,
  ItalicOutlined,
  UnderlineOutlined,
} from "@ant-design/icons";
import { Button, ColorPicker, Input, Modal, Spin, Typography, message } from "antd";
import Title from "antd/es/typography/Title";
import { useParams, usePathname, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

export default function ArticleEditPage() {
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();
  const locale = pathname.split("/")[1] ?? "th";

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [previewVisible, setPreviewVisible] = useState(false);
  const [color, setColor] = useState("#1677ff");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const inputInsertImageRef = useRef();

  const {
    useAction,
    optionList,
    preview,
    EditorZone,
    onSetInitHtmlContent,
  } = useBlogger();

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await fetch(`/api/resource/article/${params.id_article}`);
        if (!res.ok) throw new Error("Not found");
        const data = await res.json();
        setTitle(data.title ?? "");
        setDescription(data.description ?? "");
        onSetInitHtmlContent(data.content ?? "");
      } catch {
        message.error("โหลดบทความไม่ได้");
      } finally {
        setLoading(false);
      }
    };
    fetchArticle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id_article]);

  const onChangeTextColor = (e) => {
    const hex = convert_rgba_to_hex({ ...e.metaColor });
    setColor(hex);
    useAction.setColor(hex);
  };

  const onSetLink = () => {
    const url = window.prompt("URL");
    useAction.setLink(url, "_blank");
  };

  const saveArticle = async () => {
    const content = useAction.getHTML();
    if (!title || content === "<p></p>") {
      message.warning("กรุณากรอกชื่อและเนื้อหา");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch(`/api/resource/article/${params.id_article}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, content }),
      });
      if (res.ok) {
        message.success("บันทึกสำเร็จ");
        router.push(`/${locale}/admin/article`);
      } else {
        message.error("บันทึกไม่สำเร็จ");
      }
    } catch {
      message.error("เกิดข้อผิดพลาด");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", padding: 80 }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="max-w-[1250px] w-full mx-auto mb-[8rem]">
      <div className="mt-[2rem] mb-[1rem]" style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <Button onClick={() => router.push(`/${locale}/admin/article`)}>← กลับ</Button>
        <h1 style={{ margin: 0 }}>แก้ไขบทความ</h1>
      </div>
      <section>
        <Title level={2}>Title</Title>
        <Input
          placeholder="Title"
          value={title}
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
          <AlignLeftOutlined onClick={useAction.setTextAlignLeft} />
          <AlignCenterOutlined onClick={useAction.setTextAlignCenter} />
          <AlignRightOutlined onClick={useAction.setTextAlignRight} />
          <div className="button-solid-color" onClick={() => useAction.setColor("#fa5456")}>
            <div className="bg-(--c)"></div>
          </div>
          <div className="button-solid-color" onClick={() => useAction.setColor("#fc8823")}>
            <div className="bg-(--a)"></div>
          </div>
          <div className="button-solid-color" onClick={() => useAction.setColor("#00b5bc")}>
            <div className="bg-(--d)"></div>
          </div>
          <div className="button-solid-color" onClick={() => useAction.setColor("#000")}>
            <div className="bg-black"></div>
          </div>
          <div className="button-solid-color" onClick={() => useAction.setColor("#fff")}>
            <div className="bg-white"></div>
          </div>
          <ColorPicker value={color} onChangeComplete={onChangeTextColor} />
          <div className="cursor-pointer underline text-blue-500" onClick={onSetLink}>
            Link
          </div>
          <Button onClick={() => useAction.setParagraph()}>P</Button>
          <Button onClick={() => useAction.setHeading(1)}>H1</Button>
          <Button onClick={() => useAction.setHeading(2)}>H2</Button>
          <Button onClick={() => useAction.setHeading(3)}>H3</Button>
          <Button onClick={() => useAction.setHeading(4)}>H4</Button>
          <Button onClick={() => useAction.setHeading(5)}>H5</Button>
          <Button onClick={() => useAction.setHeading(6)}>H6</Button>
        </div>
        <div className="image-bar">
          <label>Image: </label>
          <FileImageOutlined onClick={() => inputInsertImageRef.current.click()} />
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
                    align: "center",
                  });
                };
                reader.readAsDataURL(file);
              }
            }}
          />
          <AlignLeftOutlined onClick={() => useAction.alignSelectedImage("left")} />
          <AlignCenterOutlined onClick={() => useAction.alignSelectedImage("center")} />
          <AlignRightOutlined onClick={() => useAction.alignSelectedImage("right")} />
        </div>
        <div className="button-bar">
          <button onClick={() => setPreviewVisible(true)}>Preview</button>
          <button onClick={saveArticle} disabled={saving}>
            {saving ? "กำลังบันทึก..." : "บันทึก"}
          </button>
        </div>
      </section>
      <section className="mt-[1rem]">
        <Title level={2}>Description</Title>
        <Input
          placeholder="Description"
          value={description}
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
