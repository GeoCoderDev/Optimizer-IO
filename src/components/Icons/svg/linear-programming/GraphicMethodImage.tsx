import { IconProps } from "../../Icon.interface";

const GraphicMethodImage = ({ className, onClick, title }: IconProps) => {
  return (
    <div title={title ?? ""} onClick={() => onClick?.()}>
      <svg
        className={`aspect-auto ${className}`}
        viewBox="0 0 225 225"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M57.12 183.32H67.92V197.84C66.4 198.347 64.84 198.733 63.24 199C61.64 199.267 59.8267 199.4 57.8 199.4C54.92 199.4 52.48 198.827 50.48 197.68C48.48 196.533 46.96 194.867 45.92 192.68C44.88 190.493 44.36 187.827 44.36 184.68C44.36 181.693 44.9467 179.107 46.12 176.92C47.2933 174.733 48.9733 173.04 51.16 171.84C53.3733 170.64 56.0667 170.04 59.24 170.04C60.7867 170.04 62.28 170.2 63.72 170.52C65.1867 170.813 66.52 171.227 67.72 171.76L65.96 175.96C65.0533 175.507 64 175.133 62.8 174.84C61.6267 174.52 60.4 174.36 59.12 174.36C57.1733 174.36 55.4933 174.787 54.08 175.64C52.6667 176.493 51.5733 177.707 50.8 179.28C50.0533 180.827 49.68 182.653 49.68 184.76C49.68 186.787 49.9733 188.587 50.56 190.16C51.1467 191.707 52.08 192.92 53.36 193.8C54.64 194.653 56.3067 195.08 58.36 195.08C59.0533 195.08 59.6533 195.053 60.16 195C60.6933 194.947 61.1733 194.88 61.6 194.8C62.0533 194.72 62.48 194.64 62.88 194.56V187.68H57.12V183.32ZM85.6234 176.92C85.9434 176.92 86.3168 176.933 86.7434 176.96C87.1701 176.987 87.5301 177.04 87.8234 177.12L87.3834 181.8C87.1434 181.747 86.8234 181.707 86.4234 181.68C86.0501 181.627 85.7168 181.6 85.4234 181.6C84.6234 181.6 83.8501 181.733 83.1034 182C82.3834 182.24 81.7301 182.613 81.1434 183.12C80.5834 183.6 80.1301 184.227 79.7834 185C79.4634 185.773 79.3034 186.693 79.3034 187.76V199H74.2634V177.32H78.1434L78.8634 181.08H79.1034C79.5301 180.307 80.0634 179.613 80.7034 179C81.3434 178.36 82.0768 177.853 82.9034 177.48C83.7568 177.107 84.6634 176.92 85.6234 176.92ZM99.7003 176.92C102.5 176.92 104.62 177.533 106.06 178.76C107.527 179.96 108.26 181.853 108.26 184.44V199H104.7L103.7 196H103.54C102.927 196.773 102.287 197.427 101.62 197.96C100.98 198.467 100.234 198.827 99.3803 199.04C98.5536 199.28 97.5403 199.4 96.3403 199.4C95.0603 199.4 93.9003 199.16 92.8603 198.68C91.847 198.2 91.047 197.467 90.4603 196.48C89.8736 195.467 89.5803 194.2 89.5803 192.68C89.5803 190.44 90.3936 188.76 92.0203 187.64C93.6736 186.493 96.167 185.867 99.5003 185.76L103.26 185.64V184.56C103.26 183.173 102.927 182.187 102.26 181.6C101.594 181.013 100.66 180.72 99.4603 180.72C98.367 180.72 97.3136 180.88 96.3003 181.2C95.287 181.52 94.3003 181.893 93.3403 182.32L91.7403 178.8C92.807 178.24 94.0203 177.787 95.3803 177.44C96.767 177.093 98.207 176.92 99.7003 176.92ZM100.62 188.84C98.407 188.92 96.8736 189.307 96.0203 190C95.167 190.667 94.7403 191.573 94.7403 192.72C94.7403 193.733 95.047 194.467 95.6603 194.92C96.2736 195.373 97.0603 195.6 98.0203 195.6C99.487 195.6 100.727 195.187 101.74 194.36C102.754 193.507 103.26 192.253 103.26 190.6V188.76L100.62 188.84ZM107.06 168.76C106.74 169.133 106.3 169.587 105.74 170.12C105.207 170.653 104.607 171.213 103.94 171.8C103.3 172.387 102.66 172.947 102.02 173.48C101.407 173.987 100.86 174.413 100.38 174.76H97.0203V174.24C97.447 173.733 97.927 173.147 98.4603 172.48C98.9936 171.787 99.5136 171.08 100.02 170.36C100.554 169.613 100.98 168.947 101.3 168.36H107.06V168.76ZM125.816 181.12H120.576V199H115.536V181.12H112.056V178.72L115.536 177.28V175.8C115.536 173.933 115.829 172.467 116.416 171.4C117.003 170.333 117.856 169.573 118.976 169.12C120.096 168.64 121.416 168.4 122.936 168.4C124.003 168.4 124.963 168.493 125.816 168.68C126.669 168.84 127.376 169.027 127.936 169.24L126.656 173C126.203 172.867 125.696 172.747 125.136 172.64C124.603 172.507 124.016 172.44 123.376 172.44C122.416 172.44 121.709 172.747 121.256 173.36C120.803 173.973 120.576 174.827 120.576 175.92V177.32H125.816V181.12ZM134.456 177.32V199H129.416V177.32H134.456ZM131.936 168.96C132.683 168.96 133.336 169.16 133.896 169.56C134.456 169.933 134.736 170.613 134.736 171.6C134.736 172.56 134.456 173.253 133.896 173.68C133.336 174.08 132.683 174.28 131.936 174.28C131.163 174.28 130.496 174.08 129.936 173.68C129.403 173.253 129.136 172.56 129.136 171.6C129.136 170.613 129.403 169.933 129.936 169.56C130.496 169.16 131.163 168.96 131.936 168.96ZM149.664 199.4C147.611 199.4 145.824 199.013 144.304 198.24C142.811 197.44 141.651 196.227 140.824 194.6C140.024 192.947 139.624 190.84 139.624 188.28C139.624 185.613 140.064 183.453 140.944 181.8C141.851 180.12 143.091 178.893 144.664 178.12C146.237 177.32 148.037 176.92 150.064 176.92C151.424 176.92 152.637 177.053 153.704 177.32C154.771 177.587 155.677 177.907 156.424 178.28L154.944 182.24C154.117 181.92 153.291 181.653 152.464 181.44C151.637 181.2 150.837 181.08 150.064 181.08C148.864 181.08 147.864 181.347 147.064 181.88C146.291 182.413 145.717 183.213 145.344 184.28C144.971 185.32 144.784 186.64 144.784 188.24C144.784 189.787 144.971 191.08 145.344 192.12C145.744 193.16 146.331 193.947 147.104 194.48C147.877 194.987 148.837 195.24 149.984 195.24C151.211 195.24 152.291 195.093 153.224 194.8C154.157 194.507 155.037 194.107 155.864 193.6V197.96C155.037 198.467 154.144 198.827 153.184 199.04C152.251 199.28 151.077 199.4 149.664 199.4ZM180.303 188.12C180.303 189.933 180.063 191.533 179.583 192.92C179.103 194.307 178.41 195.493 177.503 196.48C176.623 197.44 175.53 198.173 174.223 198.68C172.943 199.16 171.516 199.4 169.943 199.4C168.45 199.4 167.076 199.16 165.823 198.68C164.57 198.173 163.476 197.44 162.543 196.48C161.636 195.493 160.93 194.307 160.423 192.92C159.916 191.533 159.663 189.933 159.663 188.12C159.663 185.72 160.076 183.693 160.903 182.04C161.73 180.36 162.916 179.093 164.463 178.24C166.036 177.36 167.89 176.92 170.023 176.92C172.05 176.92 173.823 177.36 175.343 178.24C176.89 179.093 178.103 180.36 178.983 182.04C179.863 183.693 180.303 185.72 180.303 188.12ZM164.823 188.12C164.823 189.64 164.996 190.947 165.343 192.04C165.716 193.107 166.276 193.92 167.023 194.48C167.796 195.04 168.783 195.32 169.983 195.32C171.21 195.32 172.196 195.04 172.943 194.48C173.716 193.92 174.276 193.107 174.623 192.04C174.97 190.947 175.143 189.64 175.143 188.12C175.143 186.573 174.956 185.28 174.583 184.24C174.236 183.173 173.676 182.373 172.903 181.84C172.156 181.28 171.183 181 169.983 181C168.17 181 166.85 181.613 166.023 182.84C165.223 184.067 164.823 185.827 164.823 188.12Z"
          fill="url(#paint0_linear_51_293)"
        />
        <rect
          x="3"
          y="3"
          width="219"
          height="219"
          rx="17"
          stroke="url(#paint1_linear_51_293)"
          stroke-width="6"
        />
        <path
          d="M70.2247 23L62.6404 32.4803H77.8089L70.2247 23ZM70.2247 149.405L77.8089 139.924H62.6404L70.2247 149.405ZM68.911 29.8181V142.586H71.5383V31.7228L68.911 29.8181Z"
          fill="url(#paint2_linear_51_293)"
        />
        <path
          d="M176.405 125.388L166.924 117.803V132.972L176.405 125.388ZM50 125.388L59.4803 132.972V117.803L50 125.388ZM169.586 124.074H56.8181V126.701H169.586V124.074Z"
          fill="url(#paint3_linear_51_293)"
        />
        <path
          d="M100.562 125.388L70.2247 88.9458V50.809L152.388 94.4185V125.388H100.562Z"
          fill="url(#paint4_linear_51_293)"
          stroke="url(#paint5_linear_51_293)"
        />
        <path
          d="M51.264 23H54.523L56.5824 28.9246C56.649 29.1176 56.7023 29.3106 56.7423 29.5036C56.7956 29.6965 56.8356 29.896 56.8623 30.1018C56.9023 30.3076 56.9289 30.5264 56.9422 30.758H57.0022C57.0422 30.4234 57.0955 30.1083 57.1622 29.8123C57.2421 29.5036 57.3288 29.2076 57.4221 28.9246L59.4415 23H62.6404L58.0219 34.8878C57.742 35.6083 57.3754 36.213 56.9222 36.7019C56.4824 37.1908 55.9692 37.5574 55.3827 37.8019C54.7962 38.0463 54.1564 38.1685 53.4633 38.1685C53.1301 38.1685 52.8369 38.1492 52.5836 38.1106C52.3437 38.0849 52.1304 38.0527 51.9438 38.0142V35.7369C52.0905 35.7627 52.2637 35.7884 52.4637 35.8141C52.6769 35.8399 52.8968 35.8527 53.1234 35.8527C53.5366 35.8527 53.8899 35.7691 54.1831 35.6019C54.4897 35.4346 54.7429 35.203 54.9429 34.9071C55.1428 34.6241 55.3028 34.3153 55.4227 33.9808L55.6027 33.4597L51.264 23Z"
          fill="url(#paint6_linear_51_293)"
        />
        <path
          d="M167.881 141.063L163.964 135.5H167.725L170.084 139.125L172.465 135.5H176.226L172.265 141.063L176.404 146.876H172.644L170.084 142.98L167.525 146.876H163.764L167.881 141.063Z"
          fill="url(#paint7_linear_51_293)"
        />
        <defs>
          <linearGradient
            id="paint0_linear_51_293"
            x1="113"
            y1="156"
            x2="113"
            y2="208"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#22D0B5" />
            <stop offset="1" stop-color="#3F3CD8" />
          </linearGradient>
          <linearGradient
            id="paint1_linear_51_293"
            x1="112.5"
            y1="0"
            x2="112.5"
            y2="225"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#22D0B5" />
            <stop offset="1" stop-color="#3F3CD8" />
          </linearGradient>
          <linearGradient
            id="paint2_linear_51_293"
            x1="70.2247"
            y1="23"
            x2="70.2247"
            y2="149.404"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#22D0B5" />
            <stop offset="1" stop-color="#3F3CD8" />
          </linearGradient>
          <linearGradient
            id="paint3_linear_51_293"
            x1="113.202"
            y1="117.803"
            x2="113.202"
            y2="132.972"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#22D0B5" />
            <stop offset="1" stop-color="#3F3CD8" />
          </linearGradient>
          <linearGradient
            id="paint4_linear_51_293"
            x1="111.306"
            y1="50.809"
            x2="111.306"
            y2="125.388"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#22D0B5" />
            <stop offset="1" stop-color="#3F3CD8" />
          </linearGradient>
          <linearGradient
            id="paint5_linear_51_293"
            x1="111.306"
            y1="50.809"
            x2="111.306"
            y2="125.388"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#22D0B5" />
            <stop offset="1" stop-color="#3F3CD8" />
          </linearGradient>
          <linearGradient
            id="paint6_linear_51_293"
            x1="56.9522"
            y1="23"
            x2="56.9522"
            y2="38.1685"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#22D0B5" />
            <stop offset="1" stop-color="#3F3CD8" />
          </linearGradient>
          <linearGradient
            id="paint7_linear_51_293"
            x1="170.084"
            y1="135.5"
            x2="170.084"
            y2="146.876"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#22D0B5" />
            <stop offset="1" stop-color="#3F3CD8" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default GraphicMethodImage;
