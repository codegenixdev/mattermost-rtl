# Mattermost RTL Enhancement Extension

![Extension Logo](images/icon-128.png)

## 🌟 Overview

A Chrome extension designed to enhance the Mattermost experience for Persian (Farsi) users by improving RTL (Right-to-Left) support and implementing better font handling. This extension automatically detects Mattermost sites and applies RTL improvements and the Vazir font for better readability.

## ✨ Features

- 🔤 Automatic RTL direction for Persian text
- 📝 Vazir font integration for better Persian text display
- 🔄 Intelligent text direction detection
- 💬 Enhanced message box handling
- 🎯 Specific improvements for:
  - Post content and comments
  - Message text areas
  - Markdown editors
  - Code blocks (maintains LTR)
  - Thread views
  - Inline paragraphs

## 🚀 Installation

1. Download the extension from the Chrome Web Store (link coming soon)
2. Or install manually:
   - Clone this repository
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked"
   - Select the extension directory

## 🛠️ Usage

1. The extension automatically activates on Mattermost sites
2. Toggle the extension on/off using the popup menu
3. Refresh the page to see changes take effect
4. Enjoy improved Persian text rendering and RTL support!

## 🔧 Technical Details

- Uses MutationObserver for dynamic content handling
- Implements bidirectional text support
- Maintains LTR for code blocks
- Handles both static and dynamic content
- Preserves original styling where appropriate

## 🎨 Styling Features

- Vazir font integration for Persian text
- RTL direction for appropriate elements
- Automatic text direction detection
- Preserved LTR for code and English text
- Adjusted margins and padding for RTL layout

## ⚙️ Configuration

The extension provides a simple popup interface with:

- Enable/Disable toggle
- Status indicators
- Site compatibility check
- Visual feedback for settings

## 🔍 Compatibility

- Works on all Mattermost instances
- Automatically detects Mattermost sites
- Gracefully handles non-Mattermost sites
- Supports latest Chrome versions

## 🚧 Known Issues

- Beta version - may need refinements
- Some UI elements might need manual adjustment
- Refresh required for some changes

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [Vazir Font](https://github.com/rastikerdar/vazir-font) for the Persian font
- Mattermost team for the platform
- All contributors and users

## 📞 Support

For issues and feature requests, please use the GitHub issues section.

---

<div dir="rtl">

## 🌟 معرفی به فارسی

این افزونه کروم برای بهبود تجربه کاربری فارسی‌زبانان در Mattermost طراحی شده است. با نصب این افزونه، پشتیبانی از متن‌های راست به چپ و فونت وزیر به صورت خودکار فعال می‌شود.

### ویژگی‌های اصلی

- پشتیبانی بهتر از متون فارسی
- فونت وزیر برای خوانایی بهتر
- تشخیص خودکار جهت متن
- بهبود ظاهر پیام‌ها و نظرات
- حفظ جهت صحیح برای کدها

### نصب و استفاده

1. نصب افزونه از فروشگاه کروم
2. فعال‌سازی افزونه در سایت‌های Mattermost
3. بازنشانی صفحه برای اعمال تغییرات
4. لذت بردن از تجربه بهتر فارسی‌نویسی!

</div>
