# Khan Academy Isolated Web App for Chrome

### Pre-requisites

* You need Chrome version **146.0.7648.0 or later**.
* Navigate to `chrome://flags`.
* Enable the `#enable-isolated-web-app-dev-mode` feature flag to install IWAs.
* Enable the `#enable-unframed-iwa` feature flag.

### Install via update manifest

*   Navigate to `chrome://iwa-dev/`
*   Click "Install", then select "Update Manifest"
*   Paste in the the addresss 
    `https://github.com/tling0001/khan-iwa/raw/refs/heads/main/update_manifest.json`
*   Click "fetch" and "install"

deno run -A npm:wbn/wbn --dir khan-iwa/src -o unsigned.wbn
deno run -A npm:wbn-sign/wbn-sign -i unsigned.wbn -k khan_private_key.pem -o khan-academy.swbn