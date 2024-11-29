const handleDownload = (
  fileUrl = "https://ncp-files.nyc3.digitaloceanspaces.com/nandy-files/nginx-available.txt",
  fileName: "nginx-available.txt",
) => {
  const link = document.createElement("a");
  link.href = fileUrl;
  link.download = fileName; // Nombre del archivo al guardar
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export default handleDownload;
