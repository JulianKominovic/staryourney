use keyphrases::KeyPhraseExtractor;

#[tauri::command]
pub fn get_keywords_event(text: String) -> Vec<String> {
    let extractor = KeyPhraseExtractor::new(text.as_str(), 1);
    let mut most_frecuent_words = extractor.get_word_freq();
    let mut sorted_most_frecuent_words = most_frecuent_words.iter_mut().collect::<Vec<_>>();
    sorted_most_frecuent_words.sort_by(|a, b| b.1.cmp(&a.1));
    sorted_most_frecuent_words.dedup_by(|a, b| a.0 == b.0);
    let mut keywords = vec![];

    for (word, _) in sorted_most_frecuent_words.iter() {
        let trimmed_word = word.trim();
        if trimmed_word.len() > 1 && !trimmed_word.is_empty() {
            keywords.push(trimmed_word.to_string());
        }
        if keywords.len() == 10 {
            break;
        }
    }

    keywords
}
