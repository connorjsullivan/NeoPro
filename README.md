# NeoPro V.2 🎮✨

NeoPro is your ultimate assistant for navigating Neopets like a seasoned pro! Whether you're exploring shops or evaluating item values, NeoPro brings knowledge to your fingertips, helping you make informed decisions with ease.

## Features 🚀
- **Item Highlighting**: Automatically highlights rare items in shops based on their rarity tier.
- **Profit Calculations**: Calculates and displays the profit percentage of shop items compared to their resale value.
- **Price Database Integration**: Fetches up-to-date item prices directly from a hosted live database.
- **Custom Overlay**: Displays organized item data in a clean, scrollable interface for easy reference.
- **One-Click Operation**: A handy "Load NeoPro" button makes accessing all the features quick and simple!

## How to Use 🛠️
1. **Install Tampermonkey**: First, ensure you have the [Tampermonkey browser extension](https://www.tampermonkey.net/) installed.
2. **Add the Script**:
   - Copy the code from the `NeoPro V.2` script (found in this repository) into a new Tampermonkey script.
3. **Visit Neopets Shops**:
   - Navigate to any Neopets shop or object page, and the NeoPro button will appear.
4. **Click "Load NeoPro"**:
   - NeoPro will scan the shop, fetch item data, and highlight rare items along with profit stats!

## Technical Details 🖥️
- **Powered by Tampermonkey**: Uses `GM.xmlHttpRequest` to fetch price data from [GitHub-hosted JSON](https://raw.githubusercontent.com/connorjsullivan/NeoPro/main/Prices.json).
- **No External Dependencies**: Fully self-contained and lightweight.
- **Friendly UI Enhancements**: Clear item overlays and rarity-based color coding.

## Contributing 🌟
Have ideas for new features or improvements? Contributions are always welcome! Feel free to fork the repository, make changes, and submit a pull request.

## Roadmap 🔮
- 🛒 Support for more shops and items.
- 📈 Inflation-adjusted pricing for even more accurate profit calculations.
- 🔍 More detailed item descriptions and stats.

## Acknowledgments 💖
Thank you for trying out NeoPro! Built by **Connor Sullivan** for Neopets enthusiasts worldwide. 🐾✨

---

Enjoy your Neopets journey with NeoPro! 🥳
