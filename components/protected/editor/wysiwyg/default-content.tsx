export const defaultEditorContent = {
  type: "doc",
  content: [
    {
      type: "heading",
      attrs: { level: 2 },
      content: [{ type: "text", text: "Mulai Menulis Kisah Sukses Anda" }],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "Bagikan pengalaman inspiratif Anda dalam membantu sesama melalui kegiatan PMI Lampung. Setiap kisah yang dibagikan dapat menginspirasi orang lain untuk berbuat kebaikan.",
        },
      ],
    },
    {
      type: "heading",
      attrs: { level: 3 },
      content: [{ type: "text", text: "Tips Menulis Kisah Sukses" }],
    },
    {
      type: "orderedList",
      attrs: { tight: true, start: 1 },
      content: [
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [{ type: "text", text: "Ceritakan latar belakang dan motivasi awal Anda" }],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "Jelaskan tantangan yang dihadapi dan bagaimana mengatasinya",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "Bagikan dampak positif yang berhasil dicapai",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "Sertakan pesan inspiratif untuk pembaca",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "Gunakan editor ini untuk memformat teks, menambahkan gambar, dan membuat konten yang menarik. Ketik '/' untuk melihat opsi formatting yang tersedia.",
        },
      ],
    },
  ],
};
