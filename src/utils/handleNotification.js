const showNotification = (title, options) => new Notification(title, options);

const handleNotification = async ({ title, options }) => {
  if (!Notification) {
    return;
  }

  if (Notification.permission === 'granted') {
    showNotification(title, options);
  } else if (Notification.permission !== 'denied'
    || Notification.permission === 'default') {
    const permission = await Notification.requestPermission();

    if (permission === 'granted') {
      showNotification(title, options);
    }
  }
};

export default handleNotification;
