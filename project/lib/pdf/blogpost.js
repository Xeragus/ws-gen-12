const PDFDocument = require('pdfkit');
const fs = require('fs');

module.exports = (blogPost) => {
  const doc = new PDFDocument();

  doc.pipe(fs.createWriteStream(`pdfs/blogpost-${blogPost._id}.pdf`));

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
}

// Promises

const createPdf = (blog)=>{
  const doc = new PDFDocument();

  doc.pipe(fs.createWriteStream(`pdfs/blogpost-${blog._id}.pdf`));

  doc
    .fontSize(25)
    .text(`Title: ${blog.title}`, 100, 100)
    .text(`Content: ${blog.content}`, 200, 200);

  doc
    .addPage()
    .save()
    .moveTo(100, 150)
    .lineTo(100, 250)
    .lineTo(200, 250)
    .fill('#FF3300');

  doc.end();
}

// module.exports = (blogPost) => {
//   return new Promise ((resolve, reject)=>{
//     if(!blogPost){
//       reject(new Error("Create PDF fild!!"))
//     }
//     resolve( createPdf(blogPost) )
//   }) 
  
// }





