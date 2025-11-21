import fs from 'fs';
import path from 'path';
import Hero_Section from '@/components/portfolio_build/hero';
import Title_Section from '@/components/portfolio_build/title';
import Paragraph_Section from '@/components/portfolio_build/paragraph';
import Text_Image_Section from '@/components/portfolio_build/text_image';

let cachedData;
function getPortfolioData() {
  if (!cachedData) {
    const filePath = path.join(process.cwd(), 'src', 'data', 'json', 'portfolio.json');
    cachedData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  }
  return cachedData;
}


// Generate all slugs at build-time
export async function generateStaticParams() {
  const data = getPortfolioData();
  return data.map((item) => ({
    id: item.id,
  }));
}

// Optional metadata (SEO)
export async function generateMetadata({ params }) {
  const data = getPortfolioData();
  const item = data.find((i) => String(i.id) === String(params.id));
  return {
    title: item ? item.title : 'Portfolio Item',
    description: item ? item.description : 'Portfolio page',
  };
}

// Component mapping for words
const componentMap = { Hero_Section, Title_Section, Paragraph_Section, Text_Image_Section };

// The page component
export default function PortfolioPage({ params }) {
  const data = getPortfolioData();
  const item = data.find((i) => String(i.id) === String(params.id));

  if (!item) {
    return (
      <main className="p-8">
        <h1>404: Item Not Found</h1>
      </main>
    );
  }

  return (
    <main className="p-8">
      {item.div_struct.map((block, idx) => {
        const Component = componentMap[block.type];
        if (!Component) return null;
        return <Component key={idx} {...block.props}/>;
      })}
    </main>
  );
}
