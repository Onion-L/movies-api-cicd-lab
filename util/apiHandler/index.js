export const handleApiResponse = async (res, getData, resource, page) => {
  const data = await getData(page);
  if (data) {
    res.status(200).json(data);
  } else {
    res.status(404).json({
      message: `The ${resource} you requested could not be found.`,
      status_code: 404,
    });
  }
};
