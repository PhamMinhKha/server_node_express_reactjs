exports.uploadFile = function(req, res) {
    console.log(req.body.slug);
    var bytes = req.files.file.data.byteLength ;
    var mb = Math.round(bytes / Math.pow(1024, 2) *100) /100 ;
    var type = req.files.file.mimetype;
    if (!req.files)
    res.json({error: "File này không thể upload"})
    if(mb > 5)
    return res.json({error: "Dung lượng quá 5MB"})
    else if(!(type === "video/mp4" || type === "image/png" || type === "image/jpeg" || type === "image/gif"))
    return res.json({error: "File cho phép là mp4, png, jpg, gif"})
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let sampleFile = req.files.file;
  
  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv('./public/comments/'+ sampleFile.name, function(err) {
    if (err)
    return res.json({error: err})
    else
    return res.json({success: '/public/comments/'})
  });
  }