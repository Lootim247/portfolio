import data from '../../data/json/portfolio.json';
import Hero_Section from '../../components/portfolio_build/hero';
import Title_Section from '../../components/portfolio_build/title';
import Paragraph_Section from '../../components/portfolio_build/paragraph';
import Text_Image_Section from '../../components/portfolio_build/text_image';

const componentMap = { Hero_Section, Title_Section, Paragraph_Section, Text_Image_Section };

export async function getStaticPaths() {
  return {
    paths: data.map(item => ({ params: { id: String(item.id) } })),
    fallback: false, // or 'blocking' if you want non-prebuilt paths
  };
}

export async function getStaticProps({ params }) {
  const item = data.find(i => String(i.id) === String(params.id));
  return {
    props: {
      item: item || null
    }
  };
}

export default function PortfolioPage({ item }) {
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
        return <Component key={idx} {...block.props} />;
      })}
    </main>
  );
}
