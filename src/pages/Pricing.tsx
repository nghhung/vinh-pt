import React from 'react';
import { Pricing as PricingSection } from '../components/sections/Pricing';
import { pricingPlans } from '../data';
import styles from './Pricing.module.css';

const Pricing: React.FC = () => {
  return (
    <div className={styles.pricingPage}>
      <section className={styles.hero} aria-labelledby="pricing-page-title">
        <div className={styles.heroContent}>
          <h1 id="pricing-page-title" className={styles.heroTitle}>Bảng Giá</h1>
          <p className={styles.heroSubtitle}>
            Các gói linh hoạt phù hợp với ngân sách và mục tiêu của bạn
          </p>
        </div>
      </section>

      <PricingSection
        title="Chọn Gói Của Bạn"
        subtitle="Tất cả các gói đều bao gồm hướng dẫn chuyên nghiệp từ HLV Vinh"
        plans={pricingPlans}
      />

      <section className={styles.comparison} aria-labelledby="comparison-title">
        <div className={styles.container}>
          <h2 id="comparison-title" className={styles.sectionTitle}>So Sánh Các Gói</h2>
          <div className={styles.tableWrapper}>
            <table className={styles.comparisonTable} aria-label="So sánh các gói">
              <thead>
                <tr>
                  <th scope="col">Tính Năng</th>
                  <th scope="col">Cơ Bản</th>
                  <th scope="col" className={styles.popular}>Nâng Cao</th>
                  <th scope="col">VIP</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Tập tại Gym</th>
                  <td><span aria-label="Có">✓</span></td>
                  <td className={styles.popular}><span aria-label="Có">✓</span></td>
                  <td><span aria-label="Có">✓</span></td>
                </tr>
                <tr>
                  <th scope="row">Lớp Tập Nhóm</th>
                  <td>2/tuần</td>
                  <td className={styles.popular}>Không giới hạn</td>
                  <td>Không giới hạn</td>
                </tr>
                <tr>
                  <th scope="row">PT 1-1</th>
                  <td><span aria-label="Không">—</span></td>
                  <td className={styles.popular}>8 buổi</td>
                  <td>12 buổi</td>
                </tr>
                <tr>
                  <th scope="row">Tư Vấn Dinh Dưỡng</th>
                  <td><span aria-label="Không">—</span></td>
                  <td className={styles.popular}><span aria-label="Có">✓</span></td>
                  <td><span aria-label="Có">✓</span></td>
                </tr>
                <tr>
                  <th scope="row">Kế Hoạch Ăn Uống</th>
                  <td><span aria-label="Không">—</span></td>
                  <td className={styles.popular}><span aria-label="Không">—</span></td>
                  <td><span aria-label="Có">✓</span></td>
                </tr>
                <tr>
                  <th scope="row">Theo Dõi Tiến Độ</th>
                  <td><span aria-label="Không">—</span></td>
                  <td className={styles.popular}><span aria-label="Có">✓</span></td>
                  <td><span aria-label="Có">✓</span></td>
                </tr>
                <tr>
                  <th scope="row">Phân Tích Cơ Thể</th>
                  <td><span aria-label="Không">—</span></td>
                  <td className={styles.popular}><span aria-label="Không">—</span></td>
                  <td><span aria-label="Có">✓</span></td>
                </tr>
                <tr>
                  <th scope="row">Hỗ Trợ 24/7</th>
                  <td><span aria-label="Không">—</span></td>
                  <td className={styles.popular}><span aria-label="Không">—</span></td>
                  <td><span aria-label="Có">✓</span></td>
                </tr>
                <tr>
                  <th scope="row">Recovery Massage</th>
                  <td><span aria-label="Không">—</span></td>
                  <td className={styles.popular}><span aria-label="Không">—</span></td>
                  <td><span aria-label="Có">✓</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className={styles.faq} aria-labelledby="faq-title">
        <div className={styles.container}>
          <h2 id="faq-title" className={styles.sectionTitle}>Câu Hỏi Thường Gặp</h2>
          <div className={styles.faqGrid} role="list">
            <article className={styles.faqItem} role="listitem">
              <h3>Tôi có thể đổi gói không?</h3>
              <p>Có, bạn có thể nâng cấp hoặc hạ cấp gói bất cứ lúc nào. Thay đổi có hiệu lực từ chu kỳ thanh toán tiếp theo.</p>
            </article>
            <article className={styles.faqItem} role="listitem">
              <h3>Có hợp đồng dài hạn không?</h3>
              <p>Không có hợp đồng dài hạn. Tất cả các gói đều theo tháng và có thể hủy bất cứ lúc nào với thông báo trước 7 ngày.</p>
            </article>
            <article className={styles.faqItem} role="listitem">
              <h3>Phương thức thanh toán?</h3>
              <p>Chúng tôi chấp nhận chuyển khoản ngân hàng, Momo, ZaloPay và tiền mặt.</p>
            </article>
            <article className={styles.faqItem} role="listitem">
              <h3>Có ưu đãi cho nhóm không?</h3>
              <p>Có! Nhóm từ 2 người trở lên được giảm 10% mỗi gói. Liên hệ để biết thêm chi tiết.</p>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;
