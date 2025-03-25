public class Hint {
    private int hintId;
    private String lessonId;
    private String hintText;

    public Hint(int hintId, String lessonId, String hintText) {
        this.hintId = hintId;
        this.lessonId = lessonId;
        this.hintText = hintText;
    }

    public int getHintId() {
        return hintId;
    }

    public String getLessonId() {
        return lessonId;
    }

    public String getHintText() {
        return hintText;
    }

    @Override
    public String toString() {
        return "Hint ID: " + hintId + ", Lesson ID: " + lessonId + ", Text: " + hintText;
    }
}
