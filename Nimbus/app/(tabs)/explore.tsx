const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80, // Increased padding to the top of the screen
  },
  headerContainer: {
    paddingHorizontal: 20,
    alignItems: 'center',
    paddingBottom: 20, // Added padding to the bottom of the header
  },
  title: {
    textAlign: 'center',
    marginBottom: 5, // Adjusted margin to create space for the streak count
    fontSize: 34,
    fontWeight: 'normal',
  },
  streakCount: {
    fontSize: 32, // Match the size of the title
    fontWeight: 'normal', // Changed to normal
    marginRight: 10,
    marginTop: 10, // Adjusted margin to move the streak number lower
    lineHeight: 36, // Adjusted line height for proper spacing
  },
  streakEmoji: {
    fontSize: 32, // Match the size of the title
    lineHeight: 36, // Ensure emoji aligns with the text
  },
});
