// ── コース・ステージ定義 ────────────────────────────
const COURSES = [
  {
    id: "general",
    name: "総合コース",
    description: "会社法・民法・独禁法・個人情報など幅広い法域を横断して学ぶ",
    stages: [
      {
        id: 1, name: "入門編", role: "新入社員", questionsPerRun: 5,
        story: {
          chapter: "ステージ1　新入社員",
          scene: "株式会社ひろせ — 入門（法務・コンプラの素養）",
          narrative: `【想定する役割】
法務・コンプラに配属されたばかりの段階。専門家ではない前提で、用語と制度の"地図"を頭に置けること。

【求められる視座・態度】
分野ごとの論点を混同せず、依頼を受けたときに「どの法域の話か」を切り分けられること。

【主な知識・スキル領域】
法律用語の整理、会社法・民法・独禁法・不競法の入口、労働法・派遣法・職安法の前提、個人情報保護の基本線。`,
          skills: ["法律用語と論点の整理", "会社法・民法・独禁法・不競法の基礎概念", "労働法・派遣法・職安法と個人情報の入門"],
          clearStory: `次のステージ（一般社員）では、部門横断の相談に耐えるための業務知と法知の接続が中心になります。`,
        },
      },
      {
        id: 2, name: "法務基礎", role: "一般社員", questionsPerRun: 5,
        story: {
          chapter: "ステージ2　一般社員",
          scene: "株式会社ひろせ — 法務基礎（業務と法の接点）",
          narrative: `【想定する役割】
各部署からの相談を受ける法務の実務担当。短時間で論点を特定し、説明可能な形に整えること。

【求められる視座・態度】
「現場の言葉」と「制度の言葉」を対応づけ、依頼の背後にある規制・リスクを説明できること。

【主な知識・スキル領域】
個人情報保護法、職安法、法律用語の再確認、会計・財務・人事・労務・戦略と法リスクの接続、マネジメント用語（KPI 等）とコンプラの関係。`,
          skills: ["人事・労務・職安法と採用・派遣の論点整理", "会計・財務・戦略の数字と法リスクの接続", "マネジメント上の意思決定とコンプライアンスのバランス"],
          clearStory: `次のステージ（係長）では、契約書審査を中心に、複数法分野を横断した実務判断が中心になります。`,
        },
      },
      {
        id: 3, name: "応用実務", role: "係長", questionsPerRun: 5,
        story: {
          chapter: "ステージ3　係長",
          scene: "株式会社ひろせ — 応用実務（レビューと横断）",
          narrative: `【想定する役割】
レビューとタスクの優先順位づけを担うライン。条文の趣旨を説明し、取引の型と規制の重なりを整理できること。

【求められる視座・態度】
「正解暗記」ではなく、誤った安心を避け、リスクを言語化して関係者に伝えられること。

【主な知識・スキル領域】
契約書審査、会社法・民法・独禁法・不競法、金商法の入り口、会計論点、GDPR・個人情報の実務。`,
          skills: ["契約書審査（条項の意図とリスクの言語化）", "会社法・民法・独禁法・不競法・金商法の実務接点", "個人情報・GDPRと会計論点の整理"],
          clearStory: `次のステージ（課長）では、チームや部門をまたいだ説明責任と、優先順位に基づく判断の言語化が中心になります。`,
        },
      },
      {
        id: 4, name: "実践編", role: "課長", questionsPerRun: 5,
        story: {
          chapter: "ステージ4　課長",
          scene: "株式会社ひろせ — 実践編（課の設計と判断）",
          narrative: `【想定する役割】
課のリーダーとして、契約・人事・財務・戦略など複数論点を同じ時間軸で組み立て、関係者に説明できること。

【求められる視座・態度】
トレードオフを隠さず、優先順位と説明責任を果たすこと。出題分野がバラけても、根は同じ整理軸に戻せること。

【主な知識・スキル領域】
契約・民法・会社法、人事・労務・派遣、会計・財務・戦略、独禁法、個人情報・GDPR などの横断。`,
          skills: ["契約・民法・会社法を前提にした事業判断の裏付け", "人事・労務・派遣と事業戦略の整合", "独禁法・会計・財務のリスクを経営会議で説明する視点"],
          clearStory: `次のステージ（部長）では、サステナ開示・EU 規制など最前線のガバナンスと、組織への落とし込みが中心になります。`,
        },
      },
      {
        id: 5, name: "上級編", role: "部長", questionsPerRun: 5,
        story: {
          chapter: "ステージ5　部長",
          scene: "株式会社ひろせ — 上級編（規制の最前線とガバナンス）",
          narrative: `【想定する役割】
法務部門の責任者層として、開示・デジタル規制・データ統治と、古典的コンプラを同時に設計・説明できること。

【求められる視座・態度】
制度の変化を、社内プロセス・統制・説明責任に落とし込むこと。暗記ではなく、筋の通った説明を組み立てること。

【主な知識・スキル領域】
CSRD・サステナ開示、EU AI 法、GDPR、高度な契約書審査、個人情報の統治、会社法・民法・独禁法・不競法・労働法の統合。`,
          skills: ["CSRDを中心とした開示・サステナと法務の関与", "EU AI法・GDPR・契約書審査の前沿", "個人情報・会社法・民法・独禁法・不競法・労働法の統合リスク"],
          clearStory: `最終ステージ（CLO）では、経営・資本市場・組織横断を束ねる総合力が中心になります。`,
        },
      },
      {
        id: 6, name: "最終試験", role: "CLO", questionsPerRun: 5,
        story: {
          chapter: "ステージ6　CLO（総合）",
          scene: "株式会社ひろせ — 総合モジュール（経営に接続する法務）",
          narrative: `【想定する役割】
最高法務責任者として、デジタル規制・金融規制・個人情報・労務・財務戦略など、経営の歯車全体に法を接続し、一本の方針として示せること。

【求められる視座・態度】
バラバラな論点を束ね、経営判断と説明責任に耐える論理構造を組み立てること。

【主な知識・スキル領域】
EU AI 法、金商法、個人情報、派遣・職安、人事・労務、会計・財務・戦略・マネジメントの統合。`,
          skills: ["EU AI法と金商法を含む最前線の論点", "個人情報・派遣・職安・人事・労務の組織統治", "会計・財務・戦略・マネジメントと法リスクの統合"],
          clearStory: null,
        },
      },
    ],
  },
  {
    id: "ppc",
    name: "個人情報保護法コース",
    description: "個人情報保護法に特化。新入社員からCLOまで段階的に深める専門コース",
    stages: [
      {
        id: 1, name: "入門編", role: "新入社員", questionsPerRun: 5,
        story: {
          chapter: "ステージ1　新入社員",
          scene: "株式会社ひろせ — 個人情報保護の入口",
          narrative: `【想定する役割】
個人情報を扱う業務に就いたばかりの段階。「個人情報とは何か」「なぜ保護するのか」を正確に理解すること。

【求められる視座・態度】
個人情報・個人データ・保有個人データの違いを意識し、「個人情報だから何でもダメ」という思い込みを避けること。

【主な知識・スキル領域】
個人情報の定義、基本原則（利用目的の特定・通知・公表）、個人データ・保有個人データの概念、基本的な義務の全体像。`,
          skills: ["個人情報・個人データ・保有個人データの区別", "利用目的の特定・通知・公表の原則", "個人情報保護法の基本的義務の全体像"],
          clearStory: `次のステージ（一般社員）では、第三者提供の原則と例外、利用目的の変更など実務的な取扱いが中心になります。`,
        },
      },
      {
        id: 2, name: "法務基礎", role: "一般社員", questionsPerRun: 5,
        story: {
          chapter: "ステージ2　一般社員",
          scene: "株式会社ひろせ — 個人情報の取扱いと第三者提供",
          narrative: `【想定する役割】
日常業務で個人情報を扱い、部門からの相談に答える実務担当。第三者提供の可否を判断できること。

【求められる視座・態度】
「提供して大丈夫か」を委託・共同利用・オプトアウト・法令例外の軸で整理し、誤った安心を避けること。

【主な知識・スキル領域】
第三者提供の原則と例外（委託・共同利用・法令）、オプトアウト、利用目的の変更、記録義務（提供記録・受領記録）。`,
          skills: ["第三者提供の原則と例外の切り分け", "委託・共同利用・オプトアウトの要件", "提供記録・受領記録の義務"],
          clearStory: `次のステージ（係長）では、安全管理措置・委託先管理・開示請求対応など、組織的な実務が中心になります。`,
        },
      },
      {
        id: 3, name: "応用実務", role: "係長", questionsPerRun: 5,
        story: {
          chapter: "ステージ3　係長",
          scene: "株式会社ひろせ — 安全管理と開示対応",
          narrative: `【想定する役割】
安全管理措置の設計と委託先管理、開示・訂正・削除請求への対応を担うライン。

【求められる視座・態度】
「安全管理」を技術・組織・物理・人的の4軸で考え、委託先への監督義務を具体的に説明できること。

【主な知識・スキル領域】
安全管理措置の4分類、委託先の監督、開示・訂正・利用停止請求の手続き、個人関連情報の概念。`,
          skills: ["安全管理措置（技術的・組織的・物理的・人的）", "委託先管理と監督義務", "開示・訂正・利用停止請求の対応手順"],
          clearStory: `次のステージ（課長）では、要配慮個人情報・仮名加工・匿名加工・越境移転など高度な論点が中心になります。`,
        },
      },
      {
        id: 4, name: "実践編", role: "課長", questionsPerRun: 5,
        story: {
          chapter: "ステージ4　課長",
          scene: "株式会社ひろせ — 特殊類型と越境移転",
          narrative: `【想定する役割】
課のリーダーとして、要配慮情報・加工情報・越境移転の判断を下し、関係部門に説明できること。

【求められる視座・態度】
「利便性」と「保護」のトレードオフを隠さず、どの要件を満たせば利活用できるかを説明できること。

【主な知識・スキル領域】
要配慮個人情報（取得・提供の制限）、仮名加工情報・匿名加工情報の違いと活用、外国への第三者提供（十分性認定・標準契約条項・同意）。`,
          skills: ["要配慮個人情報の取扱い制限", "仮名加工情報・匿名加工情報の要件と活用範囲", "越境移転の3つの根拠（十分性認定・標準契約条項・同意）"],
          clearStory: `次のステージ（部長）では、漏洩報告義務・GDPRとの比較・プライバシーバイデザインなど最前線が中心になります。`,
        },
      },
      {
        id: 5, name: "上級編", role: "部長", questionsPerRun: 5,
        story: {
          chapter: "ステージ5　部長",
          scene: "株式会社ひろせ — 漏洩対応とグローバル規制",
          narrative: `【想定する役割】
部門責任者として、漏洩発生時の報告フロー設計と、GDPRを含むグローバル対応の方針を示せること。

【求められる視座・態度】
「起きたらどう動くか」を事前に設計し、規制の差異を経営判断に結び付けられること。

【主な知識・スキル領域】
漏洩等報告（個人情報保護委員会・本人通知の要件）、GDPRとの主な差異（DPO・DPIA・域外適用）、プライバシーバイデザインの考え方。`,
          skills: ["漏洩等報告義務（委員会報告・本人通知）の要件", "GDPRの主要概念（DPO・DPIA・域外適用）との比較", "プライバシーバイデザインの組織への落とし込み"],
          clearStory: `最終ステージ（CLO）では、法改正対応・行政対応・AI活用と個人情報を束ねる総合力が問われます。`,
        },
      },
      {
        id: 6, name: "最終試験", role: "CLO", questionsPerRun: 5,
        story: {
          chapter: "ステージ6　CLO（個人情報総合）",
          scene: "株式会社ひろせ — 個人情報ガバナンスの総仕上げ",
          narrative: `【想定する役割】
最高法務責任者として、改正法への対応方針、行政対応の設計、AI・データ活用と個人情報保護の両立を経営に説明できること。

【求められる視座・態度】
バラバラな論点を束ね、経営判断と説明責任に耐える一本の方針として示せること。

【主な知識・スキル領域】
改正法の主要ポイント（令和2年・4年）、個人情報保護委員会の権限（報告・立入・勧告・命令・課徴金）、AIと個人情報（学習データ・プロファイリング）、組織ガバナンス。`,
          skills: ["改正法の主要ポイントと実務対応", "個人情報保護委員会の行政権限と対応方針", "AI・データ活用と個人情報保護の両立設計"],
          clearStory: null,
        },
      },
    ],
  },
  {
    id: "ma",
    name: "M&Aコース",
    description: "M&A（合併・買収）に特化。デューデリジェンスからPMIまで段階的に学ぶ専門コース",
    stages: [
      {
        id: 1, name: "入門編", role: "新入社員", questionsPerRun: 5,
        story: {
          chapter: "ステージ1　新入社員",
          scene: "株式会社ひろせ — M&Aの入口",
          narrative: `【想定する役割】
M&A関連業務に初めて携わる段階。「M&Aとは何か」「どんな取引の型があるか」を正確に理解すること。

【求められる視座・態度】
株式譲渡・事業譲渡・合併など取引の型を混同せず、「なぜその手法が選ばれるか」を法的・実務的に説明できること。

【主な知識・スキル領域】
M&Aの基本用語（株式譲渡・事業譲渡・合併・分割・TOB）、取引の型と特徴の整理、法務・財務・税務の関与領域の概要。`,
          skills: ["M&Aの主要取引類型（株式譲渡・事業譲渡・合併・分割・TOB）", "取引類型ごとの法的特徴と実務上の違い", "M&Aプロセス全体像（検討・DD・交渉・クロージング・PMI）"],
          clearStory: `次のステージ（一般社員）では、デューデリジェンス（DD）の実務と法務DDの役割が中心になります。`,
        },
      },
      {
        id: 2, name: "法務基礎", role: "一般社員", questionsPerRun: 5,
        story: {
          chapter: "ステージ2　一般社員",
          scene: "株式会社ひろせ — デューデリジェンスの実務",
          narrative: `【想定する役割】
DDチームの一員として、法務DDの調査項目を整理し、リスク情報を取りまとめる実務担当。

【求められる視座・態度】
「何を調べるか」だけでなく「なぜそのリスクが問題になるか」を取引の文脈で説明できること。

【主な知識・スキル領域】
法務DDの調査項目（契約・訴訟・許認可・労務・知財・コンプライアンス）、レッドフラグの概念、財務DDとの連携、DDレポートの構成。`,
          skills: ["法務DDの調査項目と優先度づけ", "レッドフラグの概念と取引への影響分析", "DDレポートのまとめ方と財務DDとの連携"],
          clearStory: `次のステージ（係長）では、M&A契約書（SPA・MOU・NDA）の審査と交渉ポイントが中心になります。`,
        },
      },
      {
        id: 3, name: "応用実務", role: "係長", questionsPerRun: 5,
        story: {
          chapter: "ステージ3　係長",
          scene: "株式会社ひろせ — M&A契約書の審査と交渉",
          narrative: `【想定する役割】
M&A契約書（SPA・MOU・NDA等）の審査・交渉を担うライン。条項の意図とリスクを言語化できること。

【求められる視座・態度】
「契約書の文言」だけでなく「当事者の利害と交渉上の意味」を読み解き、修正案の根拠を説明できること。

【主な知識・スキル領域】
NDA（秘密保持契約）、MOU/LOI（基本合意）、SPA（株式購入契約）の構成と主要条項（表明保証・誓約事項・解除・補償）、クロージング条件、価格調整条項。`,
          skills: ["NDA・MOU/LOI・SPAの構成と主要条項", "表明保証・補償条項の機能と交渉ポイント", "クロージング条件と価格調整条項の整理"],
          clearStory: `次のステージ（課長）では、独禁法規制（企業結合審査）・会社法手続き・TOB規制など高度な論点が中心になります。`,
        },
      },
      {
        id: 4, name: "実践編", role: "課長", questionsPerRun: 5,
        story: {
          chapter: "ステージ4　課長",
          scene: "株式会社ひろせ — 規制対応と会社法手続き",
          narrative: `【想定する役割】
課のリーダーとして、独禁法・会社法・金商法上の規制対応を判断し、関係部門に説明できること。

【求められる視座・態度】
「手続きを知っている」だけでなく、「なぜこの規制があるか・違反するとどうなるか」を説明責任として果たせること。

【主な知識・スキル領域】
企業結合審査（届出要件・審査プロセス・問題解消措置）、会社法の組織再編手続き（株主総会・反対株主の買取請求・債権者保護）、TOB規制（金商法）の概要。`,
          skills: ["企業結合審査の届出要件と審査プロセス", "会社法の組織再編手続き（株主総会・反対株主・債権者保護）", "TOB規制（金商法）の概要と適用場面"],
          clearStory: `次のステージ（部長）では、クロスボーダーM&A・外為規制・複合的なガバナンス課題が中心になります。`,
        },
      },
      {
        id: 5, name: "上級編", role: "部長", questionsPerRun: 5,
        story: {
          chapter: "ステージ5　部長",
          scene: "株式会社ひろせ — クロスボーダーM&Aとガバナンス",
          narrative: `【想定する役割】
部門責任者として、クロスボーダーM&Aの規制対応方針を示し、ガバナンス設計を経営に提言できること。

【求められる視座・態度】
複数国の規制・文化の違いを踏まえ、「何が日本と異なるか」を制度の趣旨から説明できること。

【主な知識・スキル領域】
外為法（外資規制・事前届出）、クロスボーダーDDの留意点（準拠法・紛争解決・域外適用規制）、FCPA/贈収賄リスク、個人情報・データ規制（GDPR等）との交差、クロスボーダー独禁規制の概要。`,
          skills: ["外為法の外資規制・事前届出要件", "クロスボーダーDDの留意点（準拠法・FCPA・贈収賄）", "GDPR等データ規制とクロスボーダー独禁規制の交差"],
          clearStory: `最終ステージ（CLO）では、PMI・統合後ガバナンス・経営判断としてのM&A戦略を束ねる総合力が問われます。`,
        },
      },
      {
        id: 6, name: "最終試験", role: "CLO", questionsPerRun: 5,
        story: {
          chapter: "ステージ6　CLO（M&A総合）",
          scene: "株式会社ひろせ — M&Aガバナンスの総仕上げ",
          narrative: `【想定する役割】
最高法務責任者として、M&A全プロセス（戦略・DD・契約・規制・PMI）を統合し、経営に対して一本の方針を示せること。

【求められる視座・態度】
バラバラな法的論点を束ね、経営判断と説明責任に耐える論理構造を組み立てること。

【主な知識・スキル領域】
PMI（統合後管理）の法務課題（契約移管・許認可・労務・知財・データ）、M&A紛争（表明保証違反・補償請求）の解決、M&Aガバナンスの統合設計、経営戦略としてのM&A（資本政策・TOB防衛等）。`,
          skills: ["PMIの法務課題（契約移管・許認可・労務・知財・データ）", "表明保証違反・補償請求の対応方針", "M&Aガバナンスの統合設計と経営戦略への接続"],
          clearStory: null,
        },
      },
    ],
  },
];

const ROLE_AVATARS = {
  "新入社員": { icon: "🧑‍🎓", bg: "#eff6ff", border: "#bfdbfe", text: "#1e40af" },
  "一般社員": { icon: "🧑‍💼", bg: "#f0fdf4", border: "#86efac", text: "#166534" },
  "係長":     { icon: "💼",   bg: "#fefce8", border: "#fde047", text: "#92400e" },
  "課長":     { icon: "📊",   bg: "#fff7ed", border: "#fdba74", text: "#9a3412" },
  "部長":     { icon: "🏛️",  bg: "#fdf4ff", border: "#d8b4fe", text: "#6b21a8" },
  "CLO":      { icon: "⚖️",  bg: "#fef9c3", border: "#f59e0b", text: "#92400e" },
};

// ステージごとのボス情報（最終問題で出現）
const BOSS_DATA = [
  { icon: "📜", name: "新人最終確認・試問者" },
  { icon: "📋", name: "現場相談・最終判定官" },
  { icon: "📑", name: "契約レビュー試問者" },
  { icon: "⚔️", name: "経営会議の試金石" },
  { icon: "🏛️", name: "ガバナンスの審判者" },
  { icon: "👑", name: "最高法務責任者試験" },
];

let _lastAvatarRole = null;

function updateCharacterAvatar() {
  const avatarWrap = document.getElementById("characterAvatar");
  const avatarIcon = document.getElementById("avatarIcon");
  const avatarRoleName = document.getElementById("avatarRoleName");
  if (!avatarWrap || !avatarIcon || !avatarRoleName) return;
  const role = currentRole();
  const data = ROLE_AVATARS[role] || { icon: "👤", bg: "#f8fafc", border: "#e2e8f0", text: "#475569" };
  avatarIcon.textContent = data.icon;
  avatarRoleName.textContent = role;
  avatarWrap.style.background = data.bg;
  avatarWrap.style.borderColor = data.border;
  avatarRoleName.style.color = data.text;
  if (role !== _lastAvatarRole) {
    avatarWrap.classList.remove("avatar-pop");
    void avatarWrap.offsetHeight;
    avatarWrap.classList.add("avatar-pop");
    _lastAvatarRole = role;
  }
}

function getCurrentCourse() {
  return COURSES.find(c => c.id === state.courseId) ?? COURSES[0];
}
function getCurrentStages() {
  return getCurrentCourse().stages;
}

const CLEARED_ROLE  = "CLO";
const EXP_PER_STAGE = [10, 15, 20, 30, 40, 50];
// Google Apps Script（Webアプリ）のURLを貼り付け（空の場合は送信ボタンを非表示）
const RESULT_POST_URL = "https://script.google.com/macros/s/AKfycbwXuLpidNTJWLHTuauADQ2YxjIAyi_G-deOa_7PIO-yaVIfnYETWJstD6N2uP18tImb/exec";

function comboMultiplier(combo) {
  if (combo >= 4) return 2.5;
  if (combo >= 3) return 2.0;
  if (combo >= 2) return 1.5;
  return 1.0;
}

function speedBonus(remaining) {
  if (remaining >= 25) return 0.5;
  if (remaining >= 20) return 0.3;
  if (remaining >= 15) return 0.1;
  return 0;
}

function saveKey()     { return `legal_rpg_save_${state.courseId ?? "general"}_v3`; }
function rankingKey()  { return `legal_rpg_ranking_${state.courseId ?? "general"}_v1`; }
function wrongKey()    { return `legal_rpg_wrong_${state.courseId ?? "general"}_v1`; }
function progressKey() { return `legal_rpg_progress_${state.courseId ?? "general"}_v1`; }
function statsKey()    { return `legal_rpg_stats_${state.courseId ?? "general"}_v1`; }
const TIMER_SEC    = 30;

let allQuestions = [];
const SoundEngine = window.SoundEngine || {
  startBgm() {},
  stopBgm() {},
  toggleMute() { return true; },
  playTimeUp() {},
  playFatalWarning() {},
  playCorrect() {},
  playWrong() {},
  playCombo() {},
  playStageClear() {},
  playGameOver() {},
  playFullClear() {},
};

let questionsReady = false;

const state = {
  courseId: "general",
  name: "", hp: 100, exp: 0, lv: 1,
  stageIndex: 0, current: 0,
  gameOver: false, cleared: false, combo: 0,
  stageIntroPending: false,
  shuffledIndices: [],
  stageCorrect: 0, stageTotal: 0, stageStartHp: 100, totalScore: 0,
  sessionCorrect: 0, sessionTotal: 0,
  reviewMode: false, reviewPool: [], reviewCorrect: 0,
  stageMaxCombo: 0, stageExpBefore: 0,
};

const el = {
  startSection:    document.getElementById("startSection"),
  statusSection:   document.getElementById("statusSection"),
  quizSection:     document.getElementById("quizSection"),
  resultSection:   document.getElementById("resultSection"),
  rankingSection:  document.getElementById("rankingSection"),
  stageMapSection:   document.getElementById("stageMapSection"),
  stageIntroSection: document.getElementById("stageIntroSection"),
  statsSection:    document.getElementById("statsSection"),
  playerName:      document.getElementById("playerName"),
  startBtn:        document.getElementById("startBtn"),
  showRankingBtn:  document.getElementById("showRankingBtn"),
  clearRankingBtn: document.getElementById("clearRankingBtn"),
  stageMapBtn:     document.getElementById("stageMapBtn"),
  statsBtn:        document.getElementById("statsBtn"),
  reviewBtn:       document.getElementById("reviewBtn"),
  reviewCount:     document.getElementById("reviewCount"),
  stageMapGrid:    document.getElementById("stageMapGrid"),
  statsContent:    document.getElementById("statsContent"),
  clearStatsBtn:   document.getElementById("clearStatsBtn"),
  sName:     document.getElementById("sName"),
  sRole:     document.getElementById("sRole"),
  sLv:       document.getElementById("sLv"),
  sHp:       document.getElementById("sHp"),
  sExp:      document.getElementById("sExp"),
  sProgress: document.getElementById("sProgress"),
  sStage:    document.getElementById("sStage"),
  timerBar:  document.getElementById("timerBar"),
  timerText: document.getElementById("timerText"),
  questionText:  document.getElementById("questionText"),

  choices:       document.getElementById("choices"),
  comboDisplay:  document.getElementById("comboDisplay"),
  fatalWarning:  document.getElementById("fatalWarning"),
  resultText:    document.getElementById("resultText"),
  nextBtn:       document.getElementById("nextBtn"),
  restartBtn:    document.getElementById("restartBtn"),
  sendBtn:       document.getElementById("sendBtn"),
  shareBtn:      document.getElementById("shareBtn"),
  scoreBanner:      document.getElementById("scoreBanner"),
  scoreBannerLabel: document.getElementById("scoreBannerLabel"),
  scoreBannerValue: document.getElementById("scoreBannerValue"),
  rankingList:   document.getElementById("rankingList"),
  stageClearOverlay: document.getElementById("stageClearOverlay"),
  stageClearNum:     document.getElementById("stageClearNum"),
  stageClearRole:    document.getElementById("stageClearRole"),
  stageClearGrade:   document.getElementById("stageClearGrade"),
  questionBadge:     document.getElementById("questionBadge"),
  statusProgressBar: document.getElementById("statusProgressBar"),
  explanationBlock:  document.getElementById("explanationBlock"),
  resultGradeBadge:  document.getElementById("resultGradeBadge"),
  bossBattle:        document.getElementById("bossBattle"),
  bossAvatar:        document.getElementById("bossAvatar"),
  bossIcon:          document.getElementById("bossIcon"),
  bossName:          document.getElementById("bossName"),
  bossHpBar:         document.getElementById("bossHpBar"),
  bossHpText:        document.getElementById("bossHpText"),
  battleEffect:      document.getElementById("battleEffect"),
  battleResultBadge: document.getElementById("battleResultBadge"),
  evolutionStage:    document.getElementById("evolutionStage"),
  evolutionFromIcon: document.getElementById("evolutionFromIcon"),
  evolutionFromName: document.getElementById("evolutionFromName"),
  evolutionToIcon:   document.getElementById("evolutionToIcon"),
  evolutionToName:   document.getElementById("evolutionToName"),
};

// 初期状態は問題読み込み待ち
if (el.startBtn) {
  el.startBtn.disabled = true;
  el.startBtn.dataset.readyLabel = el.startBtn.textContent || "▶ 開始";
  el.startBtn.textContent = "⏳ 読み込み中...";
}

// ── タイマー ──────────────────────────────────────
let timerInterval   = null;
let timerRemaining  = TIMER_SEC;
let currentCorrectIdx = 0;
let isAnswering     = false;

function startTimer() {
  clearTimer();
  timerRemaining = TIMER_SEC;
  updateTimerDisplay();
  timerInterval = setInterval(() => {
    timerRemaining -= 1;
    updateTimerDisplay();
    if (timerRemaining <= 0) { clearTimer(); timeUp(); }
  }, 1000);
}

function clearTimer() {
  if (timerInterval !== null) { clearInterval(timerInterval); timerInterval = null; }
}

function updateTimerDisplay() {
  const pct = (timerRemaining / TIMER_SEC) * 100;
  el.timerBar.style.width = pct + "%";
  el.timerText.textContent = `${timerRemaining}秒`;
  el.timerBar.style.background =
    timerRemaining <= 10 ? "#ef4444" : timerRemaining <= 20 ? "#f59e0b" : "#22c55e";
}

function timeUp() {
  if (isAnswering) return;
  isAnswering = true;
  SoundEngine.playTimeUp();
  const q = getActiveQuestions()[state.shuffledIndices[state.current]];
  highlightChoices(-1);
  state.combo = 0;
  let msg = "";
  if (!state.reviewMode) {
    state.stageTotal += 1;
    updateStats(q.theme, false);
    state.sessionTotal += 1;
    if (isBossQuestion()) {
      state.hp = 0;
      animateBossAttack();
      msg = `⏰ 時間切れです。最終問題のため、このステージは終了し、コンディションは0になりました。\n正解: ${q.choices[q.answer]}\n解説: ${q.explanation}`;
    } else {
      const damage = 20;
      state.hp = Math.max(0, state.hp - damage);
      msg = `⏰ 時間切れです。コンディション -${damage}\n正解: ${q.choices[q.answer]}\n解説: ${q.explanation}`;
    }
    saveWrongAnswer(q.id);
  } else {
    msg = `⏰ 時間切れ！\n正解: ${q.choices[q.answer]}\n解説: ${q.explanation}`;
  }
  state.current += 1;
  setTimeout(() => handleAfterAnswer(msg, false), 700);
}

function highlightChoices(selectedDisplayIdx) {
  Array.from(el.choices.querySelectorAll("button")).forEach((btn, i) => {
    btn.disabled = true;
    if (i === currentCorrectIdx)       btn.classList.add("choice-correct");
    else if (i === selectedDisplayIdx) btn.classList.add("choice-wrong");
  });
}

// ── 問題管理 ──────────────────────────────────────
function getStageQuestions() {
  const stageId = getCurrentStages()[state.stageIndex].id;
  return allQuestions.filter(q =>
    (q.course ?? "general") === state.courseId && q.stage === stageId
  );
}

function getActiveQuestions() {
  return state.reviewMode ? state.reviewPool : getStageQuestions();
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildShuffledIndices() {
  const qs = getActiveQuestions();
  if (state.reviewMode) {
    state.shuffledIndices = shuffle([...Array(qs.length).keys()]);
  } else {
    const perRun = getCurrentStages()[state.stageIndex].questionsPerRun;
    state.shuffledIndices = shuffle([...Array(qs.length).keys()]).slice(0, perRun);
  }
}

/** @returns {boolean} ストーリー画面を表示した（この後はユーザーの開始操作待ち） */
function showStageIntro() {
  const story = getCurrentStages()[state.stageIndex].story;
  if (!story) {
    state.stageIntroPending = false;
    return false;
  }
  const introChapter = document.getElementById("introChapter");
  const introScene = document.getElementById("introScene");
  const introNarrative = document.getElementById("introNarrative");
  const introSkillsList = document.getElementById("introSkillsList");
  // ストーリー用DOMが無い環境ではイントロをスキップし、同じ呼び出しでクイズへ進める
  if (!el.stageIntroSection || !introChapter || !introScene || !introNarrative || !introSkillsList) {
    state.stageIntroPending = false;
    return false;
  }

  introChapter.textContent = story.chapter;
  introScene.textContent = story.scene;
  introNarrative.textContent = story.narrative;
  introSkillsList.innerHTML = story.skills.map(s => `<li>${s}</li>`).join("");
  el.quizSection.classList.add("hidden");
  el.resultSection.classList.add("hidden");
  el.stageIntroSection.classList.remove("hidden");
  return true;
}

function isBossQuestion() {
  if (state.reviewMode) return false;
  return state.current === getCurrentStages()[state.stageIndex].questionsPerRun - 1;
}

// ── ボス戦演出 ────────────────────────────────────
function showBossPanel() {
  if (!el.bossBattle) return;
  const boss = BOSS_DATA[state.stageIndex] || { icon: "👹", name: "最終試問" };
  el.bossIcon.textContent = boss.icon;
  el.bossName.textContent = `Stage ${state.stageIndex + 1} BOSS — ${boss.name}`;
  el.bossHpBar.style.width = "100%";
  el.bossHpText.textContent = "HP 100 / 100";
  el.bossAvatar.classList.remove("boss-shake");
  el.bossBattle.classList.remove("boss-defeated");
  el.bossBattle.classList.remove("hidden");
  el.battleEffect.className = "battle-effect";
  el.battleResultBadge.className = "battle-result-badge hidden";
  el.battleResultBadge.textContent = "";
}

function hideBossPanel() {
  if (!el.bossBattle) return;
  el.bossBattle.classList.add("hidden");
}

function triggerBattleEffect(kind) {
  if (!el.battleEffect) return;
  el.battleEffect.className = "battle-effect";
  void el.battleEffect.offsetHeight;
  el.battleEffect.classList.add(kind);
}

function showBattleResultBadge(kind, label) {
  if (!el.battleResultBadge) return;
  el.battleResultBadge.textContent = label;
  el.battleResultBadge.className = `battle-result-badge ${kind}`;
}

function animateBossDefeat() {
  if (!el.bossBattle) return;
  triggerBattleEffect("slash");
  setTimeout(() => {
    triggerBattleEffect("flash");
    el.bossHpBar.style.width = "0%";
    el.bossHpText.textContent = "HP 0 / 100";
    el.bossAvatar.classList.add("boss-shake");
    setTimeout(() => {
      el.bossBattle.classList.add("boss-defeated");
      showBattleResultBadge("victory", "撃破！");
    }, 320);
  }, 220);
}

function animateBossAttack() {
  if (!el.bossBattle) return;
  triggerBattleEffect("boss-hit");
  el.bossAvatar.classList.add("boss-shake");
  if (el.quizSection) {
    el.quizSection.classList.remove("player-hit");
    void el.quizSection.offsetHeight;
    el.quizSection.classList.add("player-hit");
    setTimeout(() => el.quizSection.classList.remove("player-hit"), 500);
  }
  setTimeout(() => {
    el.bossAvatar.classList.remove("boss-shake");
    showBattleResultBadge("defeat", "被弾…");
  }, 320);
}

function currentRole() {
  if (state.cleared) return CLEARED_ROLE;
  return getCurrentStages()[state.stageIndex].role;
}

// ── セーブ ────────────────────────────────────────
function saveState() {
  if (!state.reviewMode) localStorage.setItem(saveKey(), JSON.stringify(state));
}

function loadState() {
  const raw = localStorage.getItem(saveKey());
  if (!raw) return false;
  try { Object.assign(state, JSON.parse(raw)); return true; } catch { return false; }
}

// ── ② 復習リスト ──────────────────────────────────
function getWrongAnswers() {
  try { return JSON.parse(localStorage.getItem(wrongKey()) || "[]"); } catch { return []; }
}

function saveWrongAnswer(id) {
  const list = getWrongAnswers();
  if (!list.includes(id)) list.push(id);
  localStorage.setItem(wrongKey(), JSON.stringify(list));
  updateReviewBtn();
}

function removeWrongAnswer(id) {
  localStorage.setItem(wrongKey(), JSON.stringify(getWrongAnswers().filter(x => x !== id)));
  updateReviewBtn();
}

function updateReviewBtn() {
  const count = getWrongAnswers().length;
  el.reviewCount.textContent = count;
  el.reviewBtn.classList.toggle("hidden", count === 0);
}

// ── ⑧ ステージ進捗 ────────────────────────────────
function getProgress() {
  try { return JSON.parse(localStorage.getItem(progressKey()) || '{"maxStageCleared":-1}'); }
  catch { return { maxStageCleared: -1 }; }
}

function updateProgress(clearedStageIndex) {
  const prog = getProgress();
  if (clearedStageIndex > prog.maxStageCleared) {
    prog.maxStageCleared = clearedStageIndex;
    localStorage.setItem(progressKey(), JSON.stringify(prog));
  }
}

function renderStageMap() {
  const { maxStageCleared } = getProgress();
  const stages = getCurrentStages();
  el.stageMapGrid.innerHTML = stages.map((s, i) => {
    let cls, statusText, statusIcon;
    if (i <= maxStageCleared)            { cls = "cleared";   statusText = "修了済"; statusIcon = "✅"; }
    else if (i === maxStageCleared + 1)  { cls = "available"; statusText = "受講可能"; statusIcon = "▶"; }
    else                                 { cls = "locked";    statusText = "ロック中"; statusIcon = "🔒"; }
    const isLast = i === stages.length - 1;
    return `
      <div class="stage-tl-row">
        <div class="stage-tl-left">
          <div class="stage-tl-dot ${cls}"></div>
          ${!isLast ? '<div class="stage-tl-line"></div>' : ''}
        </div>
        <div class="stage-tl-content stage-node ${cls}">
          <div class="stage-node-num">Stage ${i + 1}</div>
          <div class="stage-node-name">${s.name}</div>
          <div class="stage-node-role">${s.role}</div>
          <div class="stage-tl-status ${cls}">${statusIcon} ${statusText}</div>
        </div>
      </div>`;
  }).join("");
}

// ── ⑤ 正答率統計 ──────────────────────────────────
function getStats() {
  try { return JSON.parse(localStorage.getItem(statsKey()) || "{}"); } catch { return {}; }
}

function updateStats(theme, correct) {
  const stats = getStats();
  if (!stats[theme]) stats[theme] = { correct: 0, total: 0 };
  stats[theme].total += 1;
  if (correct) stats[theme].correct += 1;
  localStorage.setItem(statsKey(), JSON.stringify(stats));
}

function renderStats() {
  const stats   = getStats();
  const entries = Object.entries(stats).sort((a, b) => b[1].total - a[1].total);
  if (entries.length === 0) {
    el.statsContent.innerHTML = '<p class="stats-empty">まだデータがありません。研修を進めると蓄積されます。</p>';
    return;
  }
  el.statsContent.innerHTML = entries.map(([theme, { correct, total }]) => {
    const pct   = Math.round((correct / total) * 100);
    const color = pct >= 80 ? "#22c55e" : pct >= 60 ? "#f59e0b" : "#ef4444";
    return `
      <div class="stats-row">
        <div class="stats-theme">${theme}</div>
        <div class="stats-bar-bg">
          <div class="stats-bar-fill" style="width:${pct}%;background:${color}"></div>
        </div>
        <div class="stats-label">${correct}/${total}問 (${pct}%)</div>
      </div>`;
  }).join("");
}

// ── UI更新 ────────────────────────────────────────
function updateStatus() {
  const perRun = state.shuffledIndices.length || getCurrentStages()[state.stageIndex].questionsPerRun;
  el.sName.textContent     = state.name;
  el.sRole.textContent     = currentRole();
  el.sLv.textContent       = String(state.lv);
  el.sHp.textContent       = state.reviewMode ? "—" : String(state.hp);
  el.sExp.textContent      = state.reviewMode ? "—" : String(state.exp);
  el.sProgress.textContent = `${Math.min(state.current, perRun)}/${perRun}`;
  el.sStage.textContent    = state.reviewMode
    ? "復習モード"
    : `Stage ${state.stageIndex + 1}/${getCurrentStages().length} ${getCurrentStages()[state.stageIndex].name}`;
  if (el.statusProgressBar) {
    const perRun = state.shuffledIndices.length || getCurrentStages()[state.stageIndex].questionsPerRun;
    const pct = perRun > 0 ? Math.min(state.current, perRun) / perRun * 100 : 0;
    el.statusProgressBar.style.width = pct + "%";
  }
  updateCharacterAvatar();
}

// ── パネル切替 ────────────────────────────────────
const panels = ["rankingSection", "stageMapSection", "statsSection"];

function showPanel(panelId) {
  const target  = document.getElementById(panelId);
  const wasHidden = target.classList.contains("hidden");
  panels.forEach(id => document.getElementById(id).classList.add("hidden"));
  if (wasHidden) target.classList.remove("hidden");
}

// ── 問題表示 ──────────────────────────────────────
function showQuestion() {
  if (!state.reviewMode && state.stageIntroPending) {
    const showedIntro = showStageIntro();
    if (showedIntro) return;
  }

  isAnswering = false;
  const qs = getActiveQuestions();
  if (!qs.length) {
    clearTimer();
    el.quizSection.classList.remove("hidden");
    el.resultSection.classList.add("hidden");
    if (el.questionText) {
      el.questionText.textContent = "このステージに出題できる問題がありません。questions.json を確認してください。";
    }
    if (el.choices) el.choices.innerHTML = "";
    return;
  }
  if (!state.shuffledIndices || state.shuffledIndices.length === 0) buildShuffledIndices();
  if (state.current >= state.shuffledIndices.length) state.current = 0;
  const q = qs[state.shuffledIndices[state.current]];
  if (!q) {
    clearTimer();
    el.quizSection.classList.remove("hidden");
    if (el.questionText) {
      el.questionText.textContent = "問題の読み込みに失敗しました。ページを再読み込みするか、セーブを消してやり直してください。";
    }
    if (el.choices) el.choices.innerHTML = "";
    return;
  }

  el.quizSection.classList.remove("hidden");
  el.resultSection.classList.add("hidden");
  el.nextBtn.textContent = "次へ";
  el.shareBtn.classList.add("hidden");


  if (!state.reviewMode && state.combo >= 2) {
    const mult = comboMultiplier(state.combo);
    el.comboDisplay.textContent = `連続正解 ${state.combo} ×${mult.toFixed(1)}`;
    el.comboDisplay.classList.remove("hidden");
  } else {
    el.comboDisplay.classList.add("hidden");
  }

  const isBoss = isBossQuestion();
  el.fatalWarning.classList.toggle("hidden", !isBoss);
  el.quizSection.classList.toggle("boss-mode", isBoss && !state.reviewMode);
  if (isBoss && !state.reviewMode) {
    showBossPanel();
    setTimeout(() => SoundEngine.playFatalWarning(), 300);
  } else {
    hideBossPanel();
  }
  if (el.questionBadge) {
    const perRun = state.shuffledIndices.length;
    el.questionBadge.textContent = `問 ${state.current + 1} / ${perRun}`;
    el.questionBadge.classList.remove("hidden");
  }
  el.questionText.textContent = `Q${state.current + 1}${state.reviewMode ? " [復習]" : ""}${isBoss ? " [最終問題]" : ""} [${q.theme}] ${q.text}`;
  el.choices.innerHTML = "";

  const choiceOrder    = shuffle([...Array(q.choices.length).keys()]);
  currentCorrectIdx    = choiceOrder.indexOf(q.answer);

  choiceOrder.forEach((origIdx, displayIdx) => {
    const b = document.createElement("button");
    b.className   = "choice-btn";
    b.textContent = `${displayIdx + 1}. ${q.choices[origIdx]}`;
    b.addEventListener("click", () => answerQuestion(displayIdx));
    el.choices.appendChild(b);
  });

  startTimer();
  saveState();
}

// ── 回答処理 ──────────────────────────────────────
function answerQuestion(selected) {
  if (isAnswering) return;
  isAnswering = true;
  clearTimer();

  const q       = getActiveQuestions()[state.shuffledIndices[state.current]];
  const correct = selected === currentCorrectIdx;
  highlightChoices(selected);
  let msg = "";

  if (correct) SoundEngine.playCorrect();
  else SoundEngine.playWrong();

  if (state.reviewMode) {
    if (correct) {
      state.reviewCorrect += 1;
      removeWrongAnswer(q.id);
      msg += "✅ 正解！ 復習リストから削除しました\n";
    } else {
      msg += "❌ 不正解\n";
      msg += `正解: ${q.choices[q.answer]}\n`;
    }
    msg += `解説: ${q.explanation}`;
    state.current += 1;
    setTimeout(() => handleAfterAnswer(msg, correct), 700);
    return;
  }

  updateStats(q.theme, correct);
  state.stageTotal += 1;
  state.sessionTotal += 1;
  const wasBoss = isBossQuestion();
  if (correct) {
    state.sessionCorrect += 1;
    state.combo += 1;
    state.stageMaxCombo = Math.max(state.stageMaxCombo, state.combo);
    const mult    = comboMultiplier(state.combo);
    const speed   = speedBonus(timerRemaining);
    const baseExp = EXP_PER_STAGE[state.stageIndex] ?? 10;
    const gained  = Math.floor(baseExp * mult);
    const bonus   = Math.floor(baseExp * speed);
    state.exp    += gained + bonus;
    state.stageCorrect += 1;
    msg += `✅ 正解！ 習熟pt +${gained}`;
    if (state.combo >= 2) { msg += ` （連続正解 ${state.combo} ×${mult.toFixed(1)}）`; setTimeout(() => SoundEngine.playCombo(state.combo), 160); }
    if (bonus > 0)        msg += ` ⚡ 速答ボーナス +${bonus}`;
    msg += "\n";
    while (state.exp >= state.lv * 50) {
      state.lv += 1;
      msg += `⬆️ 段階が上がりました（段階 ${state.lv}）\n`;
    }
    if (wasBoss) animateBossDefeat();
  } else {
    state.combo = 0;
    saveWrongAnswer(q.id);
    if (wasBoss) {
      state.hp = 0;
      animateBossAttack();
      msg += `最終問題で誤答のため、このステージは終了し、コンディションは0になりました。\n`;
    } else {
        const damage = 20;
      state.hp = Math.max(0, state.hp - damage);
      msg += `❌ 不正解です。コンディション -${damage}\n`;
    }
    msg += `正解: ${q.choices[q.answer]}\n`;
  }

  msg += `解説: ${q.explanation}`;
  state.current += 1;
  setTimeout(() => handleAfterAnswer(msg, correct), 700);
}

// ── 結果処理 ──────────────────────────────────────
function handleAfterAnswer(msg, correct) {
  const perRun = state.shuffledIndices.length;

  if (state.reviewMode) {
    if (state.current >= perRun) {
      msg += `\n\n📚 復習完了！ ${state.reviewCorrect}/${perRun}問 正解`;
      msg += "\n正解した問題は復習リストから削除されました。";
      el.nextBtn.classList.add("hidden");
      el.restartBtn.classList.remove("hidden");
      el.shareBtn.classList.add("hidden");
    } else {
      el.nextBtn.classList.remove("hidden");
      el.restartBtn.classList.add("hidden");
      el.shareBtn.classList.add("hidden");
    }
    el.scoreBanner.classList.add("hidden");
    if (el.resultGradeBadge) el.resultGradeBadge.className = "result-grade-badge hidden";
    finishResult(msg);
    return;
  }

  if (state.hp <= 0) {
    state.gameOver = true;
    const score = calcScore();
    state.totalScore = score;
    saveRanking(state.name, score, "セッション終了");
    SoundEngine.stopBgm();
    setTimeout(() => SoundEngine.playGameOver(), 200);
    msg += `\n\nセッションはここまでです（コンディション0）。\nスコア: ${score}`;
    el.nextBtn.classList.add("hidden");
    el.restartBtn.classList.remove("hidden");
    setShareText(buildShareTextGameOver(score));
    if (el.resultGradeBadge) el.resultGradeBadge.className = "result-grade-badge hidden";

  } else if (state.current >= perRun) {
    const grade = calcGrade(state.stageCorrect, state.stageTotal, state.hp, state.stageStartHp);

    if (state.stageIndex < getCurrentStages().length - 1) {
      const clearedIdx   = state.stageIndex;
      const clearedStage = getCurrentStages()[clearedIdx];
      const oldRole      = clearedStage.role;
      const nextRole     = getCurrentStages()[state.stageIndex + 1].role;
      updateProgress(clearedIdx);
      SoundEngine.playStageClear();
      const clearStats = {
        correct: state.stageCorrect,
        total: state.stageTotal,
        expGained: state.exp - state.stageExpBefore,
        maxCombo: state.stageMaxCombo,
      };
      showStageClearOverlay(clearedIdx + 1, oldRole, nextRole, grade.label, false, clearStats);
      if (clearedStage.story?.clearStory) msg += `\n\n${clearedStage.story.clearStory}`;
      msg += `\n\n評価: ${grade.label}（${grade.reason}）`;
      msg += `\n正答率: ${state.stageCorrect}/${state.stageTotal}問`;
      msg += `\n次のステージ: ${getCurrentStages()[state.stageIndex + 1].name}`;
      msg += `\n次の役職ステージ: ${nextRole}`;
      el.shareBtn.classList.add("hidden");

      state.stageIndex += 1;
      state.current = 0;

      state.combo   = 0;
      state.stageMaxCombo = 0;
      state.stageExpBefore = state.exp;
      state.stageCorrect = 0;
      state.stageTotal   = 0;
      state.stageStartHp = state.hp;
      state.stageIntroPending = true;
      buildShuffledIndices();
      if (el.resultGradeBadge) {
        el.resultGradeBadge.textContent = grade.label;
        el.resultGradeBadge.className = `result-grade-badge grade-${grade.label}`;
      }
      el.nextBtn.textContent = "次のステージを開始";
      el.nextBtn.classList.remove("hidden");
      el.restartBtn.classList.add("hidden");

    } else {
      updateProgress(state.stageIndex);
      state.cleared = true;
      const score = calcScore();
      state.totalScore = score;
      saveRanking(state.name, score, grade.label);
      SoundEngine.stopBgm();
      SoundEngine.playFullClear();
      const finalClearStats = {
        correct: state.stageCorrect,
        total: state.stageTotal,
        expGained: state.exp - state.stageExpBefore,
        maxCombo: state.stageMaxCombo,
      };
      const finalOldRole = getCurrentStages()[state.stageIndex].role;
      showStageClearOverlay(getCurrentStages().length, finalOldRole, CLEARED_ROLE, grade.label, true, finalClearStats);
      msg += `\n\n——全ステージを修了し、最終役職としてCLOを想定した評価ラインに到達しました。\n継続的な学習と、実務での検証をおすすめします。`;
      msg += `\n評価: ${grade.label}（${grade.reason}）`;
      msg += `\n正答率: ${state.stageCorrect}/${state.stageTotal}問`;
      msg += `\n最終スコア: ${score}`;
      el.nextBtn.classList.add("hidden");
      el.restartBtn.classList.remove("hidden");
      setShareText(buildShareTextFullClear(grade.label, score));
      if (el.resultGradeBadge) {
        el.resultGradeBadge.textContent = grade.label;
        el.resultGradeBadge.className = `result-grade-badge grade-${grade.label}`;
      }
    }
  } else {
    el.nextBtn.classList.remove("hidden");
    el.restartBtn.classList.add("hidden");
    el.shareBtn.classList.add("hidden");
    if (el.resultGradeBadge) el.resultGradeBadge.className = "result-grade-badge hidden";
  }

  if (state.gameOver || state.cleared) {
    el.scoreBanner.classList.remove("hidden");
    el.scoreBanner.classList.toggle("gameover", state.gameOver);
    el.scoreBannerLabel.textContent = state.gameOver ? "セッション終了 ／ 総合スコア" : "総合スコア";
    el.scoreBannerValue.textContent = `${state.totalScore} pt`;
  } else {
    el.scoreBanner.classList.add("hidden");
  }

  finishResult(msg);
  saveState();
}

function highlightExplanation(text) {
  const escaped = text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  return escaped
    .replace(/「([^」]+)」/g, '「<strong class="expl-kw">$1</strong>」')
    .replace(/\n/g, "<br>");
}

function finishResult(msg) {
  updateStatus();
  el.quizSection.classList.add("hidden");
  el.resultSection.classList.remove("hidden");
  const explMarker = "解説: ";
  const explIdx = msg.lastIndexOf(explMarker);
  if (el.explanationBlock) {
    if (explIdx !== -1) {
      el.resultText.textContent = msg.slice(0, explIdx).replace(/\n+$/, "");
      el.explanationBlock.classList.add("hidden");
      el.explanationBlock.innerHTML = highlightExplanation(msg.slice(explIdx + explMarker.length));
      void el.explanationBlock.offsetHeight; // reflow to re-trigger animation
      el.explanationBlock.classList.remove("hidden");
    } else {
      el.resultText.textContent = msg;
      el.explanationBlock.classList.add("hidden");
    }
  } else {
    el.resultText.textContent = msg;
  }
  if (el.sendBtn) {
    const canSend = Boolean(RESULT_POST_URL) && !state.reviewMode && (state.gameOver || state.cleared);
    el.sendBtn.classList.toggle("hidden", !canSend);
    el.sendBtn.disabled = false;
    el.sendBtn.textContent = "📝 結果を送信";
  }
}

// ── ③ シェア ──────────────────────────────────────
function setShareText(text) {
  el.shareBtn.classList.remove("hidden");
  el.shareBtn.dataset.text = text;
}

function buildShareTextStageClear(stageNum, grade, correct, total) {
  return `法務クイズ研修\nStage ${stageNum}「${getCurrentStages()[stageNum - 1].name}」修了\n評価: ${grade} / 正答率: ${correct}/${total}\n役職ステージ: ${getCurrentStages()[Math.min(stageNum, getCurrentStages().length - 1)].role}\n#法務クイズ研修`;
}

function buildShareTextFullClear(grade, score) {
  return `法務クイズ研修 全ステージ修了\n最終役職ライン: ${CLEARED_ROLE}\n評価: ${grade} / スコア: ${score}pt\n#法務クイズ研修`;
}

function buildShareTextGameOver(score) {
  return `法務クイズ研修\nStage ${state.stageIndex + 1}でセッション終了\nスコア: ${score}pt\n再チャレンジ歓迎 #法務クイズ研修`;
}

function buildShareTextReview(correct, total) {
  return `法務クイズ研修 復習モード\n${correct}/${total}問 正解 #法務クイズ研修`;
}

// ── 結果送信（Google Apps Script）────────────────────
function buildResultPayload() {
  const now = new Date();
  const course = getCurrentCourse();
  const reachedStage = state.cleared ? getCurrentStages().length : (state.stageIndex + 1);
  const total = Number(state.sessionTotal) || 0;
  const correct = Number(state.sessionCorrect) || 0;
  const rate = total > 0 ? correct / total : 0;
  return {
    name: state.name,
    courseId: state.courseId ?? "general",
    courseName: course?.name ?? "",
    reachedStage,
    score: state.totalScore || calcScore(),
    accuracy: {
      correct,
      total,
      rate,
      percent: Math.round(rate * 1000) / 10,
    },
    timestamp: now.toISOString(),
  };
}

async function postResultToGas(payload) {
  if (!RESULT_POST_URL) throw new Error("RESULT_POST_URL が未設定です");
  // GitHub Pages -> Apps Script は CORS で詰まりやすいため no-cors で投げる（応答は読めない）
  await fetch(RESULT_POST_URL, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(payload),
    mode: "no-cors",
    cache: "no-store",
  });
  return null;
}

// ── ステージクリア演出 ─────────────────────────────
function playEvolutionAnimation(oldRole, newRole) {
  if (!el.evolutionStage || !oldRole || !newRole || oldRole === newRole) {
    if (el.evolutionStage) el.evolutionStage.classList.add("hidden");
    return;
  }
  const fromData = ROLE_AVATARS[oldRole] || { icon: "👤" };
  const toData   = ROLE_AVATARS[newRole] || { icon: "👤" };
  el.evolutionFromIcon.textContent = fromData.icon;
  el.evolutionFromName.textContent = oldRole;
  el.evolutionToIcon.textContent   = toData.icon;
  el.evolutionToName.textContent   = newRole;
  el.evolutionStage.classList.remove("hidden", "flashing");
  void el.evolutionStage.offsetHeight;
  el.evolutionStage.classList.add("flashing");
}

function showStageClearOverlay(stageNum, oldRole, newRole, grade, isFinal, stats = null) {
  const gradeColors = { S: "#fef08a", A: "#bfdbfe", B: "#bbf7d0", C: "#d1d5db" };
  el.stageClearNum.textContent   = isFinal ? "全ステージ修了" : `Stage ${stageNum} 修了`;
  el.stageClearRole.textContent  = isFinal ? `最終役職ライン: ${newRole}` : `次の役職ステージ: ${newRole}`;
  el.stageClearGrade.textContent = `評価 ${grade}`;
  el.stageClearGrade.style.color = gradeColors[grade] || "#e2e8f0";
  if (isFinal) {
    if (el.evolutionStage) el.evolutionStage.classList.add("hidden");
  } else {
    playEvolutionAnimation(oldRole, newRole);
  }
  const statsEl = document.getElementById("stageClearStats");
  if (statsEl && stats) {
    const acc = stats.total > 0 ? Math.round(stats.correct / stats.total * 100) : 0;
    statsEl.innerHTML =
      `<div class="stage-clear-stat"><strong>${stats.correct}/${stats.total}</strong>問正解 (${acc}%)</div>` +
      `<div class="stage-clear-stat">習熟pt <strong>+${stats.expGained}</strong></div>` +
      (stats.maxCombo >= 2 ? `<div class="stage-clear-stat">最大コンボ <strong>${stats.maxCombo}</strong></div>` : "");
    statsEl.classList.remove("hidden");
  } else if (statsEl) {
    statsEl.classList.add("hidden");
  }
  el.stageClearOverlay.classList.remove("hidden");
  setTimeout(() => el.stageClearOverlay.classList.add("hidden"), 3400);
}

// ── 評価・スコア ───────────────────────────────────
function calcGrade(correct, total, hp, startHp) {
  const accuracy = total > 0 ? correct / total : 0;
  const hpRate   = startHp > 0 ? hp / startHp : 0;
  const combined = accuracy * 0.7 + hpRate * 0.3;
  if (combined >= 0.9) return { label: "S", reason: "正答率とコンディションがともに高水準" };
  if (combined >= 0.75) return { label: "A", reason: "高い理解度" };
  if (combined >= 0.55) return { label: "B", reason: "達成基準を満たす水準" };
  return { label: "C", reason: "復習を推奨" };
}

function calcScore() {
  return state.exp * 10 + state.hp * 5 + state.lv * 50 + (state.stageIndex + 1) * 200;
}

// ── ランキング ─────────────────────────────────────
function saveRanking(name, score, grade) {
  let ranking = [];
  try { ranking = JSON.parse(localStorage.getItem(rankingKey()) || "[]"); } catch {}
  ranking.push({ name, score, grade, date: new Date().toLocaleDateString("ja-JP") });
  ranking.sort((a, b) => b.score - a.score);
  localStorage.setItem(rankingKey(), JSON.stringify(ranking.slice(0, 10)));
}

function renderRanking() {
  let ranking = [];
  try { ranking = JSON.parse(localStorage.getItem(rankingKey()) || "[]"); } catch {}
  if (ranking.length === 0) { el.rankingList.innerHTML = "<p>まだ記録がありません。</p>"; return; }
  const medals = ["🥇", "🥈", "🥉"];
  el.rankingList.innerHTML = ranking.slice(0, 5).map((r, i) =>
    `<div class="ranking-row">${medals[i] || `${i + 1}.`} <span class="ranking-name">${r.name}</span> <span class="ranking-score">${r.score}pt</span> <span class="ranking-grade grade-${r.grade}">${r.grade}</span> <span class="ranking-date">${r.date}</span></div>`
  ).join("");
}


// ── ゲーム開始・終了 ───────────────────────────────
function startGame() {
  if (!questionsReady || !allQuestions || allQuestions.length === 0) {
    alert("問題を読み込み中です。数秒待ってからもう一度開始してください。");
    return;
  }
  const name = el.playerName.value.trim();
  if (!name) { alert("受講者名を入力してください。"); return; }
  const courseId = state.courseId;
  Object.assign(state, {
    courseId, name, hp: 100, exp: 0, lv: 1,
    stageIndex: 0, current: 0,
    gameOver: false, cleared: false, combo: 0,
    stageIntroPending: true,
    shuffledIndices: [],
    stageCorrect: 0, stageTotal: 0, stageStartHp: 100, totalScore: 0,
    sessionCorrect: 0, sessionTotal: 0,
    reviewMode: false, reviewPool: [], reviewCorrect: 0,
    stageMaxCombo: 0, stageExpBefore: 0,
  });
  buildShuffledIndices();
  showGameUI();
  saveState();
}

function startReviewMode() {
  const wrongIds = getWrongAnswers();
  if (wrongIds.length === 0) { alert("復習する問題がありません。"); return; }
  const pool = allQuestions.filter(q => wrongIds.includes(q.id));
  if (pool.length === 0) { alert("問題データが見つかりません。"); return; }
  const name = el.playerName.value.trim() || "受講者";
  Object.assign(state, {
    name, reviewMode: true, reviewPool: pool, reviewCorrect: 0,
    current: 0, shuffledIndices: [],
    gameOver: false, cleared: false, combo: 0, stageIntroPending: false,
  });
  buildShuffledIndices();
  showGameUI();
}

function showGameUI() {
  el.startSection.classList.add("hidden");
  panels.forEach(id => document.getElementById(id).classList.add("hidden"));
  el.statusSection.classList.remove("hidden");
  updateStatus();
  SoundEngine.startBgm();
  showQuestion();
}

function restartGame() {
  clearTimer();
  SoundEngine.stopBgm();
  localStorage.removeItem(saveKey());
  el.playerName.value = "";
  ["statusSection","quizSection","resultSection","stageIntroSection"].forEach(id => {
    const node = document.getElementById(id);
    if (node) node.classList.add("hidden");
  });
  showCourseSelect();
}

function showCourseSelect() {
  const section = document.getElementById("courseSelectSection");
  if (!section) return;
  const grid = document.getElementById("courseGrid");
  if (grid) {
    const COURSE_META = {
      general: { icon: "⚖️", colorClass: "course-card--blue" },
      ppc:     { icon: "🛡️", colorClass: "course-card--green" },
      ma:      { icon: "🤝", colorClass: "course-card--orange" },
    };
    grid.innerHTML = COURSES.map(c => {
      const meta = COURSE_META[c.id] || { icon: "📚", colorClass: "" };
      return `
        <div class="course-card ${meta.colorClass}" data-course-id="${c.id}">
          <div class="course-card-icon">${meta.icon}</div>
          <div class="course-card-name">${c.name}</div>
          <div class="course-card-desc">${c.description}</div>
        </div>`;
    }).join("");
    grid.querySelectorAll(".course-card").forEach(card => {
      card.addEventListener("click", () => selectCourse(card.dataset.courseId));
    });
  }
  section.classList.remove("hidden");
  el.startSection.classList.add("hidden");
  ["statusSection","quizSection","resultSection","stageIntroSection",
   "rankingSection","stageMapSection","statsSection"].forEach(id => {
    const node = document.getElementById(id);
    if (node) node.classList.add("hidden");
  });
}

function selectCourse(courseId) {
  state.courseId = courseId;
  document.getElementById("courseSelectSection").classList.add("hidden");
  el.startSection.classList.remove("hidden");
  updateReviewBtn();
  // コース別の続きデータ確認
  if (loadState() && state.name && !state.reviewMode) {
    if (!state.shuffledIndices || state.shuffledIndices.length === 0) buildShuffledIndices();
    const resume = confirm("保存データがあります。続きから再開しますか？");
    if (resume) {
      el.playerName.value = state.name;
      el.startSection.classList.add("hidden");
      el.statusSection.classList.remove("hidden");
      updateStatus();
      const perRun = state.shuffledIndices.length;
      if (state.current < perRun && !state.gameOver && !state.cleared) {
        showQuestion();
      } else {
        el.resultSection.classList.remove("hidden");
        el.resultText.textContent = "続きデータを読み込みました。次へ進んでください。";
        el.nextBtn.classList.remove("hidden");
        el.restartBtn.classList.remove("hidden");
      }
      return;
    }
    localStorage.removeItem(saveKey());
    state.courseId = courseId;
  }
}

function resumeOrShowStart() {
  showCourseSelect();
}

// ── イベント ──────────────────────────────────────
el.startBtn.addEventListener("click", startGame);
el.playerName.addEventListener("keydown", e => { if (e.key === "Enter") startGame(); });
{
  const backBtn = document.getElementById("backToCourseBtn");
  if (backBtn) backBtn.addEventListener("click", showCourseSelect);
}
el.nextBtn.addEventListener("click", showQuestion);
{
  const introStartBtn = document.getElementById("introStartBtn");
  if (introStartBtn) {
    introStartBtn.addEventListener("click", () => {
      if (el.stageIntroSection) el.stageIntroSection.classList.add("hidden");
      state.stageIntroPending = false;
      showQuestion();
    });
  }
}
el.restartBtn.addEventListener("click", restartGame);

el.reviewBtn.addEventListener("click", startReviewMode);

el.showRankingBtn.addEventListener("click", () => { renderRanking(); showPanel("rankingSection"); });
el.clearRankingBtn.addEventListener("click", () => {
  if (confirm("ランキングを全件削除しますか？")) { localStorage.removeItem(rankingKey()); renderRanking(); }
});

el.stageMapBtn.addEventListener("click", () => { renderStageMap(); showPanel("stageMapSection"); });

el.statsBtn.addEventListener("click", () => { renderStats(); showPanel("statsSection"); });
el.clearStatsBtn.addEventListener("click", () => {
  if (confirm("統計データをリセットしますか？")) { localStorage.removeItem(statsKey()); renderStats(); }
});

document.querySelectorAll("[data-close-panel]").forEach(btn => {
  btn.addEventListener("click", () => panels.forEach(id => document.getElementById(id).classList.add("hidden")));
});

{
  const soundBtn = document.getElementById("soundToggleBtn");
  if (soundBtn) {
    soundBtn.addEventListener("click", () => {
      const muted = SoundEngine.toggleMute();
      soundBtn.textContent = muted ? "🔇" : "🔊";
    });
  }
}

el.shareBtn.addEventListener("click", () => {
  const text = el.shareBtn.dataset.text || "";
  navigator.clipboard.writeText(text).then(() => {
    el.shareBtn.textContent = "✅ コピーしました！";
    el.shareBtn.classList.add("copied");
    setTimeout(() => { el.shareBtn.textContent = "📋 結果をコピー"; el.shareBtn.classList.remove("copied"); }, 2000);
  }).catch(() => { prompt("以下のテキストをコピーしてください：", text); });
});

if (el.sendBtn) {
  el.sendBtn.addEventListener("click", async () => {
    try {
      el.sendBtn.disabled = true;
      el.sendBtn.textContent = "送信中...";
      const payload = buildResultPayload();
      await postResultToGas(payload);
      el.sendBtn.textContent = "送信しました";
      setTimeout(() => {
        el.sendBtn.textContent = "📝 結果を送信";
        el.sendBtn.disabled = false;
      }, 2500);
    } catch (e) {
      el.sendBtn.disabled = false;
      el.sendBtn.textContent = "📝 結果を送信";
      alert(`結果送信に失敗しました。\n${e?.message || e}`);
    }
  });
}

// ── データ読み込み ─────────────────────────────────
fetch("questions.json")
  .then(r => r.json())
  .then(questions => {
    allQuestions = questions;
    questionsReady = true;
    if (el.startBtn) {
      el.startBtn.disabled = false;
      el.startBtn.textContent = el.startBtn.dataset.readyLabel || "▶ 開始";
    }
    resumeOrShowStart();
  })
  .catch(() => {
    if (el.startBtn) {
      el.startBtn.disabled = true;
      el.startBtn.textContent = "⚠ 読み込み失敗";
    }
    document.body.innerHTML =
      "<p style='color:#f87171;padding:2rem;font-family:sans-serif'>" +
      "questions.json の読み込みに失敗しました。<br>" +
      "ローカルサーバー経由でアクセスしてください。<br>" +
      "<small>例: npx serve . または VS Code Live Server</small></p>";
  });
