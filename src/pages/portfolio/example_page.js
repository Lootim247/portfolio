import Hero_Section from '../../components/portfolio_build/hero';
import Title_Section from '../../components/portfolio_build/title';
import Paragraph_Section from '../../components/portfolio_build/paragraph';
import PDF from '@/components/portfolio_build/pdf';
import MultiPDF from '@/components/portfolio_build/multi_pdf';
import Tab_Header from '@/components/tab_bar';

export default function Page({}) {
    const pdf_params = [
            {src : "/pdfs/sample.pdf", title: "sample"},
            {src : "/pdfs/sample.pdf", title: "sample2"}
        ]
    return (
        <>
            <Title_Section params={{text: "Title", subtext: "Title2"}}/>
            <Paragraph_Section
                params = {{text: "THIS IS A HUGE PARAGRAPH"}}/>
            <MultiPDF params={{pdf_params}} />
        </>
    )
}