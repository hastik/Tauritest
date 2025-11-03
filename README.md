# Alpine Todo (Tauri)

Simple cross-platform todo application built with HTML, CSS, and Alpine.js on top of Tauri. The project is configured for desktop builds out of the box and includes the tooling required to target Android once the Android SDK is available.

## Prerequisites

- Rust toolchain (1.77 or newer) with `rustup`
- Node.js 18+
- For Android builds: Android Studio / command-line tools, Android SDKs, and the `cargo-ndk` targets described in the [Tauri Android prerequisites](https://tauri.app/start/prerequisites/#android)

## Install

```bash
npm install
```

This installs the Tauri CLI binary and the Vite dev server locally with the project.

## Run (desktop)

```bash
npm run tauri:dev
```

This starts Vite on port 1420 and launches the Tauri shell with hot reload.

## Build (desktop)

```bash
npm run tauri:build
```

Compiled application bundles appear in `src-tauri/target/release/bundle`.

## Prepare Android toolchain

1. Install the Android SDK + NDK and ensure the following environment variables are exported: `ANDROID_HOME`, `ANDROID_NDK_HOME`, `JAVA_HOME`.
2. Add the Android Rust targets:

   ```bash
   rustup target add aarch64-linux-android armv7-linux-androideabi x86_64-linux-android
   ```

3. From the project root, scaffold the Android project once:

   ```bash
   npx @tauri-apps/cli android init
   ```

   The command will prompt for the application identifier (you can reuse `com.example.alpine_todo`) and generate the Gradle project under `src-tauri/gen/android`.

4. After initialization, the following scripts are available:

   ```bash
   npm run tauri:android:dev   # launches on a running emulator/device
   npm run tauri:android:build # produces APK and AAB artifacts
   ```

## Frontend stack

- Vite for dev server / bundling (`src` is the project root)
- Alpine.js for state management (`main.js`)
- Vanilla CSS for styling (`style.css`)

Todos persist locally via `localStorage`, support filtering, inline editing, clearing completed tasks, and theme toggling.