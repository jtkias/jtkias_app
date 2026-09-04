/**
 * JTKias App — sign-up handler
 * ---------------------------------------------------------------
 * This is NOT run automatically. You paste this into a Google Apps
 * Script project bound to a Google Sheet, then deploy it as a Web App.
 * Full walkthrough: see SETUP.md in this repo.
 *
 * What it does, every time someone submits the sign-up form on the
 * landing page:
 *   1. Appends their first name, last name, email and a timestamp
 *      as a new row in the connected Google Sheet.
 *   2. Sends them a confirmation email, "From" J.T. Kias (not your
 *      raw Gmail address — see SENDER_NAME below).
 *
 * HOW TO EDIT THE EMAIL
 * ---------------------------------------------------------------
 * - EMAIL_SUBJECT is the subject line.
 * - EMAIL_BODY_HTML(firstName) is what actually gets sent — it's the
 *   formatted version (paragraphs, bold, links). Edit the text inside
 *   the template string directly. {{FIRST_NAME}} is swapped for the
 *   signer's first name automatically wherever it appears.
 * - EMAIL_BODY_TEXT(firstName) is a plain-text fallback for email
 *   clients that don't render HTML. Keep it in sync if you make a
 *   substantive change to the HTML version.
 * - After editing, save (Ctrl/Cmd+S), then you MUST push a new
 *   deployment version for the change to go live — see the note in
 *   SETUP.md ("If you ever update the script later…"). Just saving
 *   the code does not update the live Web App.
 *
 * HOW TO SEND MORE EMAILS LATER (to everyone already signed up)
 * ---------------------------------------------------------------
 * This script only sends the ONE automatic confirmation email at the
 * moment someone signs up — it's not a bulk mailer. To email everyone
 * already in the sheet (e.g. announcing "The Bible is Amazing 2"),
 * the simplest free option is a one-off script you run by hand:
 *
 *   function sendToEveryone() {
 *     var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
 *     var rows = sheet.getDataRange().getValues();
 *     var subject = "New from J.T. Kias";              // <- edit
 *     var htmlBody = "<p>Write your update here…</p>";  // <- edit
 *     for (var i = 1; i < rows.length; i++) {           // row 0 = headers
 *       var email = rows[i][3];
 *       if (email) {
 *         MailApp.sendEmail(email, subject, htmlBody.replace(/<[^>]+>/g, ''), {
 *           htmlBody: htmlBody,
 *           name: SENDER_NAME
 *         });
 *       }
 *     }
 *   }
 *
 * Paste that as a second function in this same file, edit the subject
 * and htmlBody, save, then in the Apps Script editor pick
 * "sendToEveryone" from the function dropdown at the top and click
 * ▶ Run once. (MailApp has a daily send quota — fine for a small list,
 * but for a big list later, a proper mailing tool like Mailchimp or
 * Brevo will serve you better than Apps Script.)
 *
 * ADDING (OR SWAPPING) THE BOOK 2 COVER IMAGE
 * ---------------------------------------------------------------
 * The confirmation email shows the "Bible is Amazing 2" cover using
 * the BIBLE2_COVER_URL variable below. To set it up:
 *   1. In your GitHub repo, drop the cover image file into
 *      assets/covers/ — e.g. name it bible-is-amazing-2.jpg, right
 *      next to the existing bible-is-amazing.jpg.
 *   2. Commit / upload it, and make sure GitHub Pages has redeployed
 *      (usually under a minute — same as any other site update).
 *   3. Your live image URL will be:
 *      https://yourusername.github.io/your-repo-name/assets/covers/bible-is-amazing-2.jpg
 *      (swap in your actual GitHub username and repo name).
 *   4. Paste that exact URL into BIBLE2_COVER_URL below, replacing
 *      the placeholder. Save, then push a new deployment (see above).
 *   5. Test by signing up with your own email and checking the inbox
 *      — some inboxes (Gmail included) block images by default until
 *      you tap "Show images," so don't panic if it doesn't appear
 *      instantly.
 *
 * TO MOVE THE IMAGE ELSEWHERE IN THE EMAIL
 * The <img> tag sits inside EMAIL_BODY_HTML(), in its own <div> block
 * right after the "Introducing: The Bible is Amazing Too!" paragraph.
 * Cut that whole <div style="text-align:center;…">…</div> block and
 * paste it anywhere else between two '+ '<p>…</p>'' lines to move it
 * — e.g. right under the greeting, or just above the sign-off.
 *
 * TO RESIZE IT
 * Change the two "280" values in the <img> tag (the width attribute
 * and the width in style="width:280px;…") to a different pixel size.
 * max-width:70% keeps it from overflowing on narrow phone screens no
 * matter what width you set.
 * ---------------------------------------------------------------
 */

var APP_LINK = 'https://jtkias.github.io/jtkias/';
var WHATSAPP_LINK = 'https://wa.me/263787726262';
var SENDER_NAME = 'J.T. Kias';

// Cover image for "The Bible is Amazing 2", shown inline in the email.
// This MUST be a public web address — an email can't load an image
// straight off your computer. Easiest option: add the image file to
// assets/covers/ in your GitHub repo (same place the site's other book
// covers live), then paste its live GitHub Pages URL here. See the
// "ADDING THE BOOK 2 COVER IMAGE" note near the top of this file for
// the full walkthrough.
var BIBLE2_COVER_URL = 'PASTE_THE_LIVE_IMAGE_URL_HERE';
var EMAIL_SUBJECT = "You're in — here's your JTKias App link";

function EMAIL_BODY_HTML(firstName) {
  var name = firstName || 'there';
  return ''
    + '<div style="font-family:Georgia,serif;font-size:15px;line-height:1.65;color:#17110A;max-width:600px;margin:0 auto;">'

    + '<p>Hello ' + name + ',</p>'

    + '<p>Thank you for adding your name to the email list.</p>'

    + '<p>This is a new space and place for me and I really appreciate that you took the time to sign up and read this. Thank you for taking a chance on me. Please keep your eyes peeled for other updates because there\u2019s more to come.</p>'

    + '<p>This app is made up of all the content I\u2019ve made over the years. There\u2019s a lot of pain, confusion, immaturity and more in there. I hope that you can relate. I left it all in there because I found many things that still resonate and connect with me.</p>'

    + '<p>It\u2019s the future looking back at my past and trying to make it a stepping stone to the future. With your help, that step is a leap higher.</p>'

    + '<blockquote style="margin:20px 0;padding:6px 16px;border-left:3px solid #C79A49;font-style:italic;color:#4A3820;">'
    + 'Again I say unto you, That if two of you shall agree on earth as touching any thing that they shall ask, it shall be done for them of my Father which is in heaven.'
    + '<br><strong>Matthew 18:19</strong>'
    + '</blockquote>'

    + '<p>Our combined power is realized and recorded in the book. It\u2019s been saying that we should agree&hellip; be fruitful and multiply. Hopefully, this app is a small step in letting the scripture live and breathe through the creations that come through this. That is the vision and mission.</p>'

    + '<p>You can get the JT App right here:<br>'
    + '<a href="' + APP_LINK + '" style="color:#A3702E;">' + APP_LINK + '</a></p>'

    + '<p>Since it\u2019s a no-download app, you\u2019ll want to keep that link handy. If this app takes off and people want to invest in this idea, I\u2019ll have the funds to invest in it and make it more substantial and even work with more people. Future creations grow with the type of content people want, in real-time.</p>'

    + '<p>The JT App has books, poems, quotes and a blog space. It\u2019s made up of all things writing.</p>'

    + '<p><strong>Why the app happened</strong><br>'
    + 'I\u2019ve always been writing and making music. I got to a point where I didn\u2019t know some of the songs, and realized I\u2019m the only one who knows most of them. This isn\u2019t anything new for artists &mdash; creatives create, but they don\u2019t really market and publish. Talk to any musician or artist and they\u2019ll lament the pieces that never made it out of the studio.</p>'

    + '<p>This app is designed to thwart that. I want to stream 100% original, human-written content to you through this. I love writing and that\u2019s where everything in this app comes from &mdash; I record, mix and master my own records, so with better equipment I\u2019ll get the perfect sound in the future.</p>'

    + '<p>My music journey started with writing&hellip; but the music side deserves its own explanation, another day. For now I want to stay focused on my core writing, editing and outlining process, to keep moving this app forward with new content. That means working with other people who are good at what they do, which means money, and you know how that goes.</p>'

    + '<p>Since I made all of this content solo, having the right people around is essential for real growth. I\u2019m not pushing to get a whole team together immediately, but the day I have the right tools and people in place, we\u2019ll elevate this platform. For now, I\u2019ll do what I can &mdash; a roll-out of essential updates for you, very soon. (If you know any indie artists, send them my way.)</p>'

    + '<p><strong>Marketing and promotion is mechanical</strong><br>'
    + 'I had to push myself to make this app because the people I shared my music with kept telling me more people need to hear it. So out of frustration and obedience to them, I got to work. While getting my life in order, I figured it was a good time to get my books and poems in order too.</p>'

    + '<p>I\u2019ve put everything into the JT App &mdash; works I\u2019ve kept with me for years, some so new they\u2019re not even finished being written yet. It\u2019s all the things I\u2019ve been doing, and would love to keep doing, with your help, insight and input.</p>'

    + '<p>At this stage, I want to increase and multiply.</p>'

    + '<blockquote style="margin:20px 0;padding:6px 16px;border-left:3px solid #C79A49;font-style:italic;color:#4A3820;">'
    + '&ldquo;The Lord gave the word: great was the company of those that published it.&rdquo;'
    + '<br><strong>Psalm 68:11</strong>'
    + '</blockquote>'

    + '<p>I know I can\u2019t do this alone. It\u2019s going to take the help of other individuals who see the vision of the JT App and want to invest in the diversity of art in the praise of God.</p>'

    + '<p>I am African and \u2018Christian\u2019. I believe in the Bible and it\u2019s carried me through the dark times and turbulent moments. This app happened because I was turning back to old vanilla pages and notes, seeking miracles &mdash; the little pieces of things I made and kept, without realizing it would all add up to this.</p>'

    + '<p>I feel I\u2019ve spent so much time away from the studio, away from the writing, away from what I love most. When I was in the darkness, some of the pages I\u2019m sharing shed light on me. That\u2019s what brought me here, to raising this platform with all my content.</p>'

    + '<p>The full app and everything in it lives right here:<br>'
    + '<a href="' + APP_LINK + '" style="color:#A3702E;">' + APP_LINK + '</a></p>'

    + '<p>Keep an eye on your email &mdash; and maybe join a Facebook group or WhatsApp channel down the line for more updates. Here\u2019s a preview of what\u2019s coming.</p>'

    + '<p>I really think the people who took the initiative to join the email list and read this far are going to matter to the growth of this in a lot of ways. I have fiction and non-fiction &mdash; I\u2019ll leave the non-fiction a mystery, and maybe something you help shape (don\u2019t worry, the ideas are plenty). Here\u2019s a preview of the real-world side.</p>'

    + '<p>I already wrote <em>The Bible is Amazing 1</em> &mdash; and the strange thing that still gets me is that all of this started with that research. I was researching the genealogies for a few years until I wrote a post that turned into a book. That book turned into a song. That song made me revisit my poems, and in that process I imagined a way to bring it all together. But it was all because&hellip; the Bible is amazing. This app grew out of showing how amazing the Bible is. That first book is already complete, but it has another edition on the way.</p>'

    + '<p><strong>Introducing: The Bible is Amazing Too!</strong></p>'

    + '<div style="text-align:center;margin:20px 0;">'
    + '<img src="' + BIBLE2_COVER_URL + '" alt="The Bible is Amazing 2 — The untold story of Jacob and Esau, by J.T. Kias" '
    + 'width="280" style="width:280px;max-width:70%;height:auto;border-radius:6px;display:inline-block;">'
    + '</div>'

    + '<p>If you\u2019ve ever wondered about:</p>'
    + '<ul style="padding-left:20px;">'
    + '<li>The story of Jacob and Esau</li>'
    + '<li>The genealogies of the Bible, continued</li>'
    + '<li>Prophetic destinies of the nations</li>'
    + '<li>The meanings, origins and purpose of the nations</li>'
    + '<li>Why brothers fight in the Bible</li>'
    + '<li>The purpose of all the names in the Bible</li>'
    + '<li>God\u2019s sovereignty: why love Jacob and hate Esau?</li>'
    + '<li>God\u2019s masterplan of redemption for all nations&hellip; and more</li>'
    + '</ul>'

    + '<p><em>The Bible is Amazing 2</em> is coming out soon. This book is a big deal &mdash; the first one is the foundation of all this, but the second one is the core, grit and heart of what\u2019s going on in the world right now. Everyone is talking about \u2018Israel\u2019; this is the book with the most accurate, up-to-date information I could find.</p>'

    + '<p>I\u2019m excited to share <em>The Bible is Amazing 1</em> &mdash; it\u2019s already fully stocked in the app &mdash; and just as excited about part two. For Book 2 to come out, it\u2019s going to take time. Non-fiction needs deep, accurate, credible research. Some of what\u2019s explored is virtually unknown and too obscure for most people to care about, but these are the precious things of God.</p>'

    + '<blockquote style="margin:20px 0;padding:6px 16px;border-left:3px solid #C79A49;font-style:italic;color:#4A3820;">'
    + '&ldquo;It is the glory of God to conceal a thing, but it is the honour of kings to search out a matter.&rdquo;'
    + '<br><strong>Proverbs 25:2</strong>'
    + '<br><br>'
    + '&ldquo;Come unto me, and I will answer thee, and show thee great and mighty things, which thou knowest not.&rdquo;'
    + '<br><strong>Jeremiah 33:3</strong>'
    + '</blockquote>'

    + '<p>God knows there are things we don\u2019t know. He wants us to find them, and you can be part of that discovery process. It\u2019s time for the world to know the Bible is truly amazing. But don\u2019t worry &mdash; you\u2019re already hearing about this first, so I\u2019ll let you know the moment this book is out. Any week now.</p>'

    + '<p><strong>Thank you for being active</strong><br>'
    + 'You\u2019re the reason I\u2019m making all of this, and it warms my heart to see your response and action in everything I\u2019m hoping we do together. I want you to know where we\u2019re going with the JT App, and I\u2019ll also explain something called &ldquo;Hippy Vibes International Studio&rdquo; in the music tab soon. For now, I think you should have some fun exploring the app.</p>'

    + '<p>I\u2019ll keep improving the experience, growing the content, and expressing just how amazing the Bible is. By the time <em>The Bible is Amazing 2</em> comes out, you\u2019ll be as excited about the Bible as I am.</p>'

    + '<p>I hope to know more about you too, ' + name + '. You can get my number in the app.</p>'

    + '<p>Since I\u2019m still working on everything &mdash; content, editing, proofing, recording, mixing and mastering &mdash; please be patient, because I honestly want to respond to everyone with as much detail and help as possible. Look forward to hearing from you &mdash; you can share your favorite piece, what you want to see next, and much more.</p>'

    + '<p>Blessings to you, and be a blessing too.</p>'

    + '<p><a href="' + WHATSAPP_LINK + '" style="color:#A3702E;">' + WHATSAPP_LINK + '</a></p>'

    + '<p>Regards,<br>JT Kias</p>'

    + '</div>';
}

function EMAIL_BODY_TEXT(firstName) {
  var name = firstName || 'there';
  return 'Hello ' + name + ',\n\n'
    + 'Thank you for adding your name to the email list.\n\n'
    + 'This is a new space and place for me and I really appreciate that you took the time to sign up and read this. Thank you for taking a chance on me.\n\n'
    + 'Please keep your eyes peeled for other updates because there\u2019s more to come.\n\n'
    + 'You can get the JT App right here: ' + APP_LINK + '\n\n'
    + '(This is the plain-text version of the full email J.T. Kias sends \u2014 open it in an HTML-capable inbox for the complete letter, including The Bible is Amazing 2 preview.)\n\n'
    + 'Got a story idea, or just want to say hi? Message me on WhatsApp: ' + WHATSAPP_LINK + '\n\n'
    + 'Blessings to you, and be a blessing too.\n\n'
    + 'Regards,\nJT Kias';
}

function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  var firstName = (e.parameter.firstName || '').trim();
  var lastName = (e.parameter.lastName || '').trim();
  var email = (e.parameter.email || '').trim();
  var source = (e.parameter.source || '').trim();

  // First run: add a header row if the sheet is empty.
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Timestamp', 'First name', 'Last name', 'Email', 'Source']);
  }

  sheet.appendRow([new Date(), firstName, lastName, email, source]);

  if (email) {
    try {
      var name = firstName || 'there';
      MailApp.sendEmail(email, EMAIL_SUBJECT, EMAIL_BODY_TEXT(name), {
        htmlBody: EMAIL_BODY_HTML(name),
        name: SENDER_NAME // this makes the email arrive "From: J.T. Kias <youraddress@gmail.com>" instead of just your raw address
      });
    } catch (err) {
      // If the email fails to send, the row is still saved — you can
      // always follow up manually. Logged so you can check
      // "Executions" in the Apps Script dashboard if this happens a lot.
      Logger.log('Email send failed: ' + err);
    }
  }

  return ContentService
    .createTextOutput(JSON.stringify({ result: 'success' }))
    .setMimeType(ContentService.MimeType.JSON);
}
