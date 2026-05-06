export const updateResume = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedResume = await Resume.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    if (!updatedResume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Resume updated",
      data: updatedResume,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error updating resume",
    });
  }
};