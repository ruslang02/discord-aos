## Discord client for Sailfish OS
Also supports Aurora OS (https://auroraos.ru).

Uses Qt 5, QML Silica and TypeScript. Additionally requires `qt5-qtwebsockets` package to be installed.

### Building
```
git clone https://github.com/ruslang02/discord-aos.git
```
Open the project in Qt Creator. Install packages `qt5-qtwebsockets` and `qt5-qtwebsockets-devel` into your build environment. Build and install the resulting RPM package.

### Features
 - Login using Discord token 🚧 (only "Login" button)
 - Settings view ❌
 - Direct Messages list ❌
 - Channel view ❌
 - Servers list ❌
 - ...

### Third-party
 - Qt 5
 - QML Sailfish Silica
 - QtWebSockets QML Components (https://github.com/qt/qtwebsockets/tree/5.6/src/imports/qmlwebsockets)