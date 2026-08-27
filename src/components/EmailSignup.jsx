import { useState } from 'react';

const EmailSignup = () => {
  const [sent, setSent] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    e.currentTarget.reset();
  };

  return (
    <section className="tels-email-signup">
      <div className="tels-container">
        <h2 className="tels-email-signup__title">Stay in the loop</h2>
        <p className="tels-email-signup__subtitle">Get new courses and program updates in your inbox.</p>
        {sent ? (
          <p className="tels-email-signup__success">Thanks — you&rsquo;re on the list.</p>
        ) : (
          <form className="tels-email-signup__form" onSubmit={onSubmit}>
            <input type="email" name="email" placeholder="you@example.com" required aria-label="Email address" />
            <button type="submit">Subscribe</button>
          </form>
        )}
      </div>
    </section>
  );
};

export default EmailSignup;
