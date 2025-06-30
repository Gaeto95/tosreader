# Terms TL;DR 📋
**Built with Bolt** ⚡

**Read What You're Really Signing** - An AI-powered tool that transforms complex legal documents into clear, understandable insights.

🚀 **[Live Demo](https://subclause.netlify.app)** | Built using [Bolt](https://bolt.new)

![Terms TL;DR Screenshot](https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&h=600&fit=crop)

## 🚀 What is Terms TL;DR?

Terms TL;DR is a revolutionary web application that democratizes legal document understanding. Using the power of GPT-4, it transforms intimidating Terms of Service, Privacy Policies, and other legal agreements into clear, actionable insights that anyone can understand.

**The Problem**: Millions of people blindly accept terms and conditions every day, unknowingly signing away rights or agreeing to unfavorable conditions.

**Our Solution**: AI-powered analysis that reveals what you're really agreeing to, with transparency scores, red flag detection, and plain-English explanations.

### ✨ Key Features

- **🤖 AI-Powered Analysis**: Leverages GPT-4 Turbo to provide detailed, accurate analysis of legal documents
- **📊 Transparency Scoring**: Assigns a 0-100% transparency score with detailed justification
- **🚩 Red Flag Detection**: Identifies and categorizes problematic clauses with severity ratings (1-5 scale)
- **📝 Plain English Summaries**: Converts legal jargon into clear, actionable insights
- **🎨 Beautiful UI**: Modern, responsive design with dark/light mode support
- **📱 Mobile Friendly**: Fully responsive design that works on all devices
- **🔍 Text Highlighting**: Visual highlighting of concerning clauses in original documents
- **📤 Export & Share**: Download PDFs, copy summaries, and share findings on social media
- **⚡ Lightning Fast**: Built with modern web technologies for optimal performance

## 🛠️ Technology Stack

**Built entirely using [Bolt](https://bolt.new)** - showcasing the power of AI-assisted development!

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Icons**: Lucide React
- **AI**: OpenAI GPT-4 Turbo
- **Build Tool**: Vite
- **Deployment**: Netlify
- **Development**: Bolt.new (AI-powered development platform)

## 🎯 Why This Matters

In our digital age, legal agreements govern nearly every online interaction. Yet studies show:
- 📊 **91% of consumers** accept terms without reading them
- ⏱️ It would take **76 work days** to read all privacy policies encountered in a year
- 🚨 **Hidden clauses** often limit user rights or enable unexpected data collection

Terms TL;DR bridges this gap, making legal literacy accessible to everyone.

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

1. **📋 Paste Document**: Copy and paste any Terms of Service or Privacy Policy
2. **🏷️ Select Type**: Choose the document type (ToS, Privacy Policy, EULA, etc.)
3. **🔍 Analyze**: Click "Analyze Terms" and let GPT-4 do the heavy lifting
4. **📊 Review Results**: Get a comprehensive breakdown in three intuitive tabs:
   - ✅ **Summary**: Plain-English overview of key points
   - 🚩 **Red Flags**: Concerning clauses with explanations and severity ratings
   - 📊 **Transparency Score**: Overall rating with detailed justification

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
- Data Processing Agreements
- Other Legal Documents

## 📊 Analysis Features

### 🚩 Red Flag Categories

- **Data Sharing**: Concerning data collection and sharing practices
- **Binding Arbitration**: Clauses that limit legal recourse
- **Liability Waiver**: Terms that limit company responsibility
- **Auto-Renewal**: Subscription and billing concerns
- **Content Rights**: Intellectual property and content ownership
- **Account Termination**: Unfair account closure policies

### ⚠️ Severity Levels

- **1-2**: 🟡 Low Risk - Minor concerns worth noting
- **3**: 🟠 Moderate Risk - Notable issues requiring attention
- **4-5**: 🔴 High Risk - Significant problems requiring careful consideration

### 📈 Transparency Scoring

- **70-100%**: 🟢 Good transparency with clear, fair terms
- **40-69%**: 🟡 Fair transparency with some concerning clauses
- **0-39%**: 🔴 Poor transparency with significant issues

## 🎨 Design Philosophy

Terms TL;DR follows modern design principles inspired by leading SaaS platforms:

- **🎯 User-Centric**: Every design decision prioritizes user understanding
- **♿ Accessible**: High contrast ratios, keyboard navigation, and screen reader support
- **📱 Mobile-First**: Responsive design that works beautifully on all devices
- **⚡ Performant**: Optimized for fast loading and smooth interactions
- **🎨 Beautiful**: Apple-level design aesthetics with attention to micro-interactions
- **🔒 Trustworthy**: Professional appearance that builds user confidence

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

## 🌟 What Makes This Special

### 🤖 AI-Powered Intelligence
- Uses GPT-4 Turbo for sophisticated legal document analysis
- Contextual understanding of legal language and implications
- Confidence scoring for each identified issue

### 🎨 Exceptional User Experience
- Intuitive three-tab interface for easy navigation
- Real-time text highlighting of problematic clauses
- Dark/light mode support with smooth transitions
- Export and sharing capabilities

### 📊 Actionable Insights
- Clear severity ratings help prioritize concerns
- Plain-English explanations make legal concepts accessible
- Transparency scoring provides at-a-glance document assessment

### ⚡ Built with Bolt
This entire application was developed using [Bolt](https://bolt.new), demonstrating the incredible potential of AI-assisted development. From initial concept to production deployment, Bolt enabled rapid iteration and professional-quality results.

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

- **[Bolt](https://bolt.new)** for revolutionizing the development experience
- **OpenAI** for providing the GPT-4 API that powers our analysis
- **Tailwind CSS** for the utility-first CSS framework
- **Lucide** for the beautiful icon set
- **React Team** for the amazing framework
- **Vite** for the lightning-fast build tool

## 📞 Support & Community

- **🐛 Issues**: Report bugs and request features on GitHub
- **📚 Documentation**: Check our comprehensive guides
- **💬 Discussions**: Join conversations and share feedback
- **🌐 Demo**: Try it live at [subclause.netlify.app](https://subclause.netlify.app)

---

**🚀 Built with [Bolt](https://bolt.new) - AI-powered development at its finest**

*Transforming legal complexity into clarity - one document at a time.*

### 🏆 Perfect for Hackathons

This project showcases:
- **Rapid Development**: Built entirely using AI-assisted development
- **Real-World Impact**: Addresses a genuine problem affecting millions
- **Technical Excellence**: Modern stack with production-ready code
- **User Experience**: Beautiful, intuitive interface
- **Scalability**: Ready for real-world deployment and usage

**Ready to revolutionize how people understand legal documents? Try the demo and see the future of legal literacy!**