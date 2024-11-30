const downloadFile = (
  fileUrl = "https://ncp-files.nyc3.digitaloceanspaces.com/nandy-files/nginx-available.txt",
) => {
  window.open(fileUrl, "_blank");
};

export default downloadFile;
