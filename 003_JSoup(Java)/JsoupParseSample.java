import java.util.List;
import java.util.ListIterator;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Attributes;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.nodes.Node;
import org.jsoup.select.Elements;

/**
 * HTML文字列をJSoupを使用して解析するサンプル
 * 
 */
public class JsoupParseSample {

	/**
	 * HTML文字列をJsoupライブラリを使用して、parseする。
	 * @param args
	 */
	public static void main(final String[] args) {

		// HTMLサンプル文字列作成
		final String htmlStr = getHtmlStr();

		// HTMLサンプル文字列パース
		parseSample(htmlStr);

	}

	/**
	 * HTML文字列から「head」タグを抽出して、<br>
	 * 「meta」タグの場合は、「http-equiv」、「content」の値を出力する。
	 * @param contentString HTML文字列
	 */
	private static void parseSample(final String contentString) {

		final Document doc = Jsoup.parse(contentString);

		// 「head」タグを抽出
		final Elements elementsHead = doc.getElementsByTag("head");

		final ListIterator<Element> listIteratorHead = elementsHead
				.listIterator();

		while (listIteratorHead.hasNext()) {

			final Element tmp = listIteratorHead.next();

			final List<Node> nodeLst = tmp.childNodes();

			// Nodeリスト分繰り返す
			for (final Node node : nodeLst) {

				final String nodeName = node.nodeName();

				final Attributes attributes = node.attributes();

				// Node名が「meta」タグと等しい場合
				if ("meta".equals(nodeName)) {

					System.out.println("NodeName：" + nodeName);

					final String attributeHttpEquiv = attributes
							.get("http-equiv");

					System.out.println("attributeHttpEquiv："
							+ attributeHttpEquiv);

					final String attributeContent = attributes
							.get("content");

					System.out.println("content："
							+ attributeContent);

				}

			}

		}
	}

	/**
	 * HTML文字列を作成
	 * @return HTML文字列
	 */
	private static final String getHtmlStr() {

		final StringBuilder sb = new StringBuilder();

		sb.append("<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01 Transitional//EN\" \"http://www.w3.org/TR/html4/loose.dtd\">");
		sb.append("<html>");
		sb.append("<head>");
		sb.append("<meta http-equiv=\"Content-type\" content=\"text/html; charset=Shift_JIS\">");
		sb.append("<title>Jsoupパースサンプル</title>");
		sb.append("</head>");
		sb.append("<body>");
		sb.append("本文");
		sb.append("</body>");
		sb.append("</html>");

		final String htmlStr = sb.toString();

		System.out.println("★★★");
		System.out.println(htmlStr);
		System.out.println("★★★");

		return htmlStr;

	}

}
