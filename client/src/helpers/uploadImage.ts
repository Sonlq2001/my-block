export const upLoadImage = async (img: File) => {
  try {
    if (img) {
      const formData = new FormData();
      formData.append('file', img);
      formData.append(
        'upload_preset',
        process.env.REACT_APP_CLOUDINARY_KEY as string
      );

      const res = await fetch(process.env.REACT_APP_API_CLOUDINARY as string, {
        method: 'POST',
        body: formData,
      });
      const resData = await res.json();
      return {
        idImg: resData.public_id,
        img: resData.url,
      };
    }
  } catch (error) {}
};
