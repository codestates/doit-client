const verifyContent = (content) => {
  const verified = content && content.trim();
  return verified && verified.length > 0 ? verified : null;
};

export default verifyContent;
