# Terms TL;DR 📋

**Read What You're Really Signing** - An AI-powered tool that transforms complex legal documents into clear, understandable insights.

![Terms TL;DR Screenshot](https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&h=600&fit=crop)

## 🚀 What is Terms TL;DR?

Terms TL;DR is a modern web application that uses GPT-4 to analyze Terms of Service, Privacy Policies, and other legal documents. It provides consumers with plain-English summaries, identifies concerning clauses, and assigns transparency scores to help users make informed decisions before agreeing to terms.

### ✨ Key Features

- **🤖 AI-Powered Analysis**: Leverages GPT-4 to provide detailed, accurate analysis of legal documents
- **📊 Transparency Scoring**: Assigns a 0-100% transparency score with detailed justification
- **🚩 Red Flag Detection**: Identifies and categorizes problematic clauses with severity ratings
- **📝 Plain English Summaries**: Converts legal jargon into clear, actionable insights
- **🎨 Beautiful UI**: Modern, responsive design with dark/light mode support
- **📱 Mobile Friendly**: Fully responsivae design that works on all devices
- **🔍 Text Highlighting**: Visual highlighting of concerning clauses in original documents
- **📤 Export & Share**: Download PDFs, copy summaries, and share findings on social media

## 🛠️ Technology Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **AI**: OpenAI GPT-4 Turbo
- **Build Tool**: Vite
- **Deployment**: Ready for Netlify, Vercel, or any static hosting

## 🏃‍♂️ Quick Start

### Prerequisites

- Node.js 18+ 
- OpenAI API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd terms-tldr
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Add your OpenAI API key to `.env`:
   ```
   VITE_OPENAI_API_KEY=your_openai_api_key_here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 🎯 How It Works

1. **Paste Document**: Copy and paste any Terms of Service or Privacy Policy
2. **Select Type**: Choose the document type (ToS, Privacy Policy, EULA, etc.)
3. **Analyze**: Click "Analyze Terms" and let GPT-4 do the work
4. **Review Results**: Get a comprehensive breakdown in three tabs:
   - ✅ **Summary**: Plain-English overview of key points
   - 🚩 **Red Flags**: Concerning clauses with explanations
   - 📊 **Transparency Score**: Overall rating with justification

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_OPENAI_API_KEY` | Your OpenAI API key | Yes |

### Supported Document Types

- Terms of Service (ToS)
- Privacy Policies
- End User License Agreements (EULA)
- Cookie Policies
- Other Legal Documents

## 📊 Analysis Features

### Red Flag Categories

- **Data Sharing**: Concerning data collection and sharing practices
- **Binding Arbitration**: Clauses that limit legal recourse
- **Liability Waiver**: Terms that limit company responsibility
- **Auto-Renewal**: Subscription and billing concerns
- **Content Rights**: Intellectual property and content ownership
- **Account Termination**: Unfair account closure policies

### Severity Levels

- **1-2**: Low Risk (Yellow) - Minor concerns
- **3**: Moderate Risk (Orange) - Notable issues
- **4-5**: High Risk (Red) - Significant problems

### Transparency Scoring

- **70-100%**: Good transparency with clear, fair terms
- **40-69%**: Fair transparency with some concerning clauses
- **0-39%**: Poor transparency with significant issues

## 🎨 Design Philosophy

Terms TL;DR follows modern design principles inspired by leading SaaS platforms:

- **Clean & Minimal**: Focused on content with minimal distractions
- **Accessible**: High contrast ratios and keyboard navigation
- **Responsive**: Mobile-first design that scales beautifully
- **Performant**: Optimized for fast loading and smooth interactions
- **Trustworthy**: Professional appearance that builds user confidence

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Netlify

1. Connect your repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add environment variables in Netlify dashboard

### Deploy to Vercel

```bash
npm install -g vercel
vercel --prod
```

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes**: Follow our coding standards
4. **Test thoroughly**: Ensure all features work correctly
5. **Submit a pull request**: Describe your changes clearly

### Development Guidelines

- Use TypeScript for type safety
- Follow existing code style and patterns
- Add comments for complex logic
- Test with various document types
- Ensure mobile responsiveness

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⚠️ Disclaimer

Terms TL;DR is designed for educational purposes and provides general insights about legal documents. The analysis is powered by AI and should not be considered legal advice. For important legal decisions, always consult with a qualified attorney.

## 🙏 Acknowledgments

- **OpenAI** for providing the GPT-4 API
- **Tailwind CSS** for the utility-first CSS framework
- **Lucide** for the beautiful icon set
- **React Team** for the amazing framework
- **Vite** for the lightning-fast build tool

## 📞 Support

- **Issues**: Report bugs and request features on GitHub
- **Documentation**: Check our comprehensive guides
- **Community**: Join discussions and share feedback

---

**Built with ❤️ using modern web technologies**

*Transform legal complexity into clarity - one document at a time.*