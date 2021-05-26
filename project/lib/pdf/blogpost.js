const PDFDocument = require('pdfkit');
const fs = require('fs');

module.exports = (blogPost, cb) => {
  const doc = new PDFDocument();

  const writeStream = fs.createWriteStream(`pdfs/blogpost-${blogPost._id}.pdf`)
  doc.pipe(writeStream);

  doc
    .fontSize(25)
    .text(`Title: ${blogPost.title}`, 100, 100)
    .text(`Content: ${blogPost.content}`, 200, 200);

  doc
    .addPage()
    .save()
    .moveTo(100, 150)
    .lineTo(100, 250)
    .lineTo(200, 250)
    .fill('#FF3300');

  doc.end();

  writeStream.on('finish', () => { cb() });
}