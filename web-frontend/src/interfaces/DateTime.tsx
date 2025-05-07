  const formatDateTime = (datetime: string): string => {
    try {
      const date = new Date(datetime);
      if (isNaN(date.getTime())) {
        throw new Error("Invalid date");
      }
      return new Intl.DateTimeFormat("hu-HU", {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(date);
    } catch (error) {
      return "Invalid datetime";
  };
};

export default formatDateTime;