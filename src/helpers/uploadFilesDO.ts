import { uploadToDOSpaces } from "@/services/do.service.ts";

async function uploadFilesDO(file: File) {
  const formData = new FormData();
  formData.append("file", file, file.name);

  try {
    return await uploadToDOSpaces(formData);
  } catch (error) {
    console.error("Error in Digital Ocean Files function:", error);
    throw error;
  }
}

export default uploadFilesDO;
