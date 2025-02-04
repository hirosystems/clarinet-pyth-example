(define-constant ERR_UNEXPECTED (err u5000))

(define-read-only (get-btc-price)
  (match
    (contract-call?
      'SP3R4F6C1J3JQWWCVZ3S7FRRYPMYG6ZW6RZK31FXY.pyth-storage-v3
      get-price
      0xe62df6c8b4a85fe1a67db44dc12de5db330f7ac66b72dc658afedf0f4a415b43
    )
    res (some (get price res))
    e none
  )
)

(define-read-only (get-btc-price-at (height uint))
  (let (
    (hash (unwrap-panic (get-stacks-block-info? id-header-hash height)))
  )
    (at-block hash (match
      (contract-call?
        'SP3R4F6C1J3JQWWCVZ3S7FRRYPMYG6ZW6RZK31FXY.pyth-storage-v3
        get-price
        0xe62df6c8b4a85fe1a67db44dc12de5db330f7ac66b72dc658afedf0f4a415b43
      )
      res (some (get price res))
      e none
    ))
  )
)

(define-read-only (get-sbtc-total-supply)
  (contract-call? 'SM3VDXK3WZZSA84XXFKAFAF15NNZX32CTSG82JFQ4.sbtc-token get-total-supply)
)

(define-read-only (get-sbtc-total-usd-value)
  (let (
    (sbtc-total-supply (/ (unwrap! (get-sbtc-total-supply) ERR_UNEXPECTED) u100000000))
    (btc-price (/ (to-uint (unwrap! (get-btc-price) ERR_UNEXPECTED)) u100000000))
  )
    (ok (* sbtc-total-supply btc-price))
  )
)
